import { getAccessToken } from '../utils/google-auth'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  if (!config.googleServiceAccountEmail || !config.googlePrivateKey || !config.googleSpreadsheetId) {
    throw createError({
      statusCode: 500,
      message: 'Google Sheets credentials not configured'
    })
  }

  try {
    const accessToken = await getAccessToken(
      config.googleServiceAccountEmail,
      config.googlePrivateKey.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    )

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.googleSpreadsheetId}/values/Sheet1!A:F`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`)
    }

    const result = await response.json()
    const rows = result.values || []

    if (rows.length === 0) {
      return { data: [] }
    }

    const headers = rows[0] as string[]
    const data = rows.slice(1).map((row: string[]) => {
      const entry: Record<string, string> = {}
      headers.forEach((header, index) => {
        entry[header] = row[index] || ''
      })
      return entry
    })

    return { data }
  } catch (error) {
    console.error('Error reading from Google Sheets:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch data from Google Sheets',
    })
  }
})
