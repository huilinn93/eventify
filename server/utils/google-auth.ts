// Helper to create JWT for Google Service Account authentication
export async function createGoogleJWT(
  serviceAccountEmail: string,
  privateKey: string,
  scopes: string[]
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  }
  
  const claim = {
    iss: serviceAccountEmail,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }
  
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedClaim = base64UrlEncode(JSON.stringify(claim))
  const signatureInput = `${encodedHeader}.${encodedClaim}`
  
  // Sign with private key
  const signature = await signWithRSA(privateKey, signatureInput)
  
  return `${signatureInput}.${signature}`
}

export async function getAccessToken(
  serviceAccountEmail: string,
  privateKey: string,
  scopes: string[]
): Promise<string> {
  const jwt = await createGoogleJWT(serviceAccountEmail, privateKey, scopes)
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  })
  
  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`)
  }
  
  const data = await response.json() as { access_token: string }
  return data.access_token
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

async function signWithRSA(privateKey: string, data: string): Promise<string> {
  const crypto = await import('crypto')
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(data)
  sign.end()
  
  const signature = sign.sign(privateKey, 'base64')
  
  return signature
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}
