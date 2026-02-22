import crypto from 'crypto'

/**
 * Generates a Google OAuth2 access token from a Service Account JSON key.
 * Uses only Node.js built-in `crypto` — no extra npm packages required.
 */
async function getGoogleAccessToken(serviceAccount) {
    const now = Math.floor(Date.now() / 1000)
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
    const payload = Buffer.from(JSON.stringify({
        iss: serviceAccount.client_email,
        scope: 'https://www.googleapis.com/auth/drive',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
    })).toString('base64url')

    const toSign = `${header}.${payload}`
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(toSign)
    const signature = sign.sign(serviceAccount.private_key, 'base64url')
    const jwt = `${toSign}.${signature}`

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwt,
        }),
    })

    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) {
        throw new Error(`Token error: ${JSON.stringify(tokenData)}`)
    }
    return tokenData.access_token
}

/**
 * POST /api/initiate-upload
 * Body: { fileName: string, mimeType: string, fileSize: number }
 * Returns: { uploadUrl: string }
 *
 * Creates a Google Drive resumable upload session using a Service Account.
 * The client then sends binary chunks directly to the returned uploadUrl
 * via /api/upload-chunk.
 */
export default async function handler(req, res) {
    // CORS for local dev
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') return res.status(200).end()

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        // Read body (Vercel plain serverless functions don't auto-parse)
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        const { fileName, mimeType, fileSize } = JSON.parse(Buffer.concat(chunks).toString())

        const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID
        if (!FOLDER_ID) return res.status(500).json({ error: 'GOOGLE_DRIVE_FOLDER_ID not set' })

        const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
        if (!saJson) return res.status(500).json({ error: 'GOOGLE_SERVICE_ACCOUNT_JSON not set' })

        const serviceAccount = JSON.parse(saJson)
        const accessToken = await getGoogleAccessToken(serviceAccount)

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
            return res.status(500).json({ error: `Google did not return upload URL: ${errText.substring(0, 200)}` })
        }

        return res.status(200).json({ uploadUrl })
    } catch (err) {
        console.error('initiate-upload error:', err)
        return res.status(500).json({ error: err.message })
    }
}
