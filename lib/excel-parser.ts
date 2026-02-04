// Utility to parse Excel files using a lightweight approach
// This converts Excel data to JSON-like format

export async function parseExcelFile(file: File): Promise<any[]> {
  // Load xlsx library from CDN
  const XLSX = await import('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm')

  const arrayBuffer = await file.arrayBuffer()
  const workbook = XLSX.read(arrayBuffer, { type: 'array' })
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  const jsonData = XLSX.utils.sheet_to_json(worksheet)

  return jsonData
}
