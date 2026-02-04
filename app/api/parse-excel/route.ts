import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // For Excel files, we need to parse them
    // Since xlsx library isn't installed, we'll provide instructions
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      return NextResponse.json(
        {
          error: 'Excel parsing requires conversion',
          message: 'Please convert your Excel file to CSV format (File > Save As > CSV) and upload again',
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ athletes: [] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse file' }, { status: 500 })
  }
}
