/**
 * POST /api/initiate-upload
 * Body: { fileName, mimeType, fileSize }
 * Returns: { uploadUrl }
 *
 * Creates a Google Drive resumable upload session using the user's OAuth2
 * refresh token — files land in the user's own Drive (2TB quota).
 */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') return res.status(200).end()
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    try {
        // Read body (plain Vercel functions don't auto-parse)
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        const { fileName, mimeType, fileSize } = JSON.parse(Buffer.concat(chunks).toString())

        const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID
        const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
        const clientSec = process.env.GOOGLE_OAUTH_CLIENT_SECRET
        const refreshTok = process.env.GOOGLE_OAUTH_REFRESH_TOKEN

        if (!FOLDER_ID || !clientId || !clientSec || !refreshTok) {
            return res.status(500).json({ error: `Missing env vars — FOLDER_ID:${!!FOLDER_ID} CLIENT_ID:${!!clientId} SECRET:${!!clientSec} REFRESH:${!!refreshTok}` })
        }

        // DEBUG: Log partial values to diagnose invalid_client
        console.log('DEBUG ENV CHECK:',
            'CLIENT_ID_START:', clientId?.substring(0, 20),
            'CLIENT_ID_END:', clientId?.slice(-30),
            'CLIENT_ID_LEN:', clientId?.length,
            'SECRET_LEN:', clientSec?.length,
            'REFRESH_LEN:', refreshTok?.length
        )

        // Exchange refresh token for fresh access token
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSec,
                refresh_token: refreshTok,
                grant_type: 'refresh_token',
            }),
        })
        const tokenData = await tokenRes.json()
        if (!tokenData.access_token) {
            return res.status(500).json({ error: `Token refresh failed: ${JSON.stringify(tokenData)}` })
        }

        // Initiate a Google Drive resumable upload session
        const initRes = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-Upload-Content-Type': mimeType || 'video/mp4',
                    ...(fileSize ? { 'X-Upload-Content-Length': String(fileSize) } : {}),
                },
                body: JSON.stringify({
                    name: fileName || `SpoolID_${Date.now()}.mp4`,
                    parents: [FOLDER_ID],
                    mimeType: mimeType || 'video/mp4',
                }),
            }
        )

        const uploadUrl = initRes.headers.get('location')
        if (!uploadUrl) {
            const errText = await initRes.text()
            return res.status(500).json({ error: `No upload URL from Google: ${errText.substring(0, 300)}` })
        }

        return res.status(200).json({ uploadUrl })
    } catch (err) {
        console.error('initiate-upload error:', err)
        return res.status(500).json({ error: err.message })
    }
}
