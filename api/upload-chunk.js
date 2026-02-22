/**
 * PUT /api/upload-chunk
 * Headers:
 *   x-upload-url   — Google resumable upload URL from /api/initiate-upload
 *   x-range-start  — byte offset of this chunk
 *   x-total-size   — total file size in bytes
 *   x-mime-type    — video MIME type
 * Body: raw binary chunk (≤ 3 MB to stay under Vercel's 4.5 MB limit)
 *
 * Proxies the chunk to Google Drive's resumable upload endpoint.
 */
module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-upload-url, x-range-start, x-total-size, x-mime-type')
    if (req.method === 'OPTIONS') return res.status(200).end()
    if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' })

    try {
        const uploadUrl = req.headers['x-upload-url']
        const rangeStart = parseInt(req.headers['x-range-start'] || '0', 10)
        const totalSize = parseInt(req.headers['x-total-size'] || '0', 10)
        const mimeType = req.headers['x-mime-type'] || 'video/mp4'

        if (!uploadUrl) return res.status(400).json({ error: 'Missing x-upload-url header' })

        // Read raw binary body
        const bodyChunks = []
        for await (const chunk of req) bodyChunks.push(chunk)
        const body = Buffer.concat(bodyChunks)

        const rangeEnd = rangeStart + body.length - 1
        const isLast = (rangeEnd + 1) >= totalSize
        const contentRange = isLast
            ? ('bytes ' + rangeStart + '-' + rangeEnd + '/' + totalSize)
            : ('bytes ' + rangeStart + '-' + rangeEnd + '/*')

        // Forward chunk to Google Drive resumable upload URL
        const googleRes = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': mimeType,
                'Content-Length': String(body.length),
                'Content-Range': contentRange,
            },
            body: body,
        })

        // 308 = chunk received, waiting for more
        if (googleRes.status === 308) {
            return res.status(200).json({ status: 'chunk_ok', received: rangeEnd + 1 })
        }

        // 200/201 = upload complete
        if (googleRes.status === 200 || googleRes.status === 201) {
            const fileInfo = await googleRes.json()
            return res.status(200).json({ status: 'success', fileId: fileInfo.id, fileName: fileInfo.name })
        }

        const errText = await googleRes.text()
        return res.status(500).json({
            error: 'Google HTTP ' + googleRes.status + ': ' + errText.substring(0, 300),
        })
    } catch (err) {
        console.error('upload-chunk error:', err)
        return res.status(500).json({ error: err.message })
    }
}
