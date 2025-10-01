import { getAccessToken } from '../utils/google-auth'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

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
      ['https://www.googleapis.com/auth/spreadsheets']
    )

    const timestamp = Date.now()
    const newRow = [
      timestamp.toString(),
      body.name || '',
      body.email || '',
      body.number || '',
      body.inquiry || '',
      body.otherInfo || '',
    ]

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.googleSpreadsheetId}/values/Sheet1!A:F:append?valueInputOption=RAW`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [newRow]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Google Sheets API error: ${response.statusText} - ${errorText}`)
    }

    return {
      success: true,
      message: 'Entry added successfully',
      data: {
        id: timestamp.toString(),
        ...body,
      },
    }
  } catch (error) {
    console.error('Error writing to Google Sheets:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to add entry to Google Sheets',
    })
  }
})
