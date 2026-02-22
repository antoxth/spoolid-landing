// Temporary debug endpoint — REMOVE AFTER DIAGNOSING
module.exports = async function handler(req, res) {
    const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || ''
    const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
    const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN || ''
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || ''
    const serviceAcct = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || ''

    // Try the token refresh so we can see Google's actual response
    let tokenResult = 'not attempted'
    try {
        const r = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            }).toString(),
        })
        const data = await r.json()
        tokenResult = data.access_token ? 'SUCCESS - got token' : JSON.stringify(data)
    } catch (e) {
        tokenResult = 'FETCH ERROR: ' + e.message
    }

    res.json({
        clientId_first20: clientId.substring(0, 20),
        clientId_length: clientId.length,
        clientSecret_prefix: clientSecret.substring(0, 8),
        clientSecret_length: clientSecret.length,
        refreshToken_prefix: refreshToken.substring(0, 10),
        refreshToken_length: refreshToken.length,
        folderId: folderId,
        serviceAcct_set: serviceAcct.length > 0,
        tokenRefreshResult: tokenResult,
    })
}
