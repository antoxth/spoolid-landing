import crypto from 'crypto'

/**
 * Gets a fresh Google access token using the stored OAuth2 refresh token.
 * Uses only Node.js built-in `crypto` — no extra npm packages required.
 */
async function getAccessToken() {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
            client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
            grant_type: 'refresh_token',
        }),
    })

    const data = await tokenRes.json()
    if (!data.access_token) {
        throw new Error(`Failed to get access token: ${JSON.stringify(data)}`)
    }
    return data.access_token
}

/**
 * POST /api/initiate-upload
 * Body: { fileName: string, mimeType: string, fileSize: number }
 * Returns: { uploadUrl: string }
 *
 * Creates a Google Drive resumable upload session using the user's OAuth2
 * credentials (refresh token). Files go into the user's own Drive storage.
 */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') return res.status(200).end()
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        const { fileName, mimeType, fileSize } = JSON.parse(Buffer.concat(chunks).toString())

        const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID
        if (!FOLDER_ID) return res.status(500).json({ error: 'GOOGLE_DRIVE_FOLDER_ID not set' })

        const accessToken = await getAccessToken()

        // Initiate resumable upload session with Google Drive
        const initRes = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-Upload-Content-Type': mimeType || 'video/mp4',
                    ...(fileSize ? { 'X-Upload-Content-Length': fileSize } : {}),
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
            return res.status(500).json({
                error: `Google did not return upload URL: ${errText.substring(0, 300)}`,
            })
        }

        return res.status(200).json({ uploadUrl })
    } catch (err) {
        console.error('initiate-upload error:', err)
        return res.status(500).json({ error: err.message })
    }
}
