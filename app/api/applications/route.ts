import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'public', 'data', 'applications.json')

export async function GET() {
  try {
    const raw = await fs.promises.readFile(dataPath, 'utf-8')
    const data = JSON.parse(raw || '[]')
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const raw = await fs.promises.readFile(dataPath, 'utf-8')
    const list = JSON.parse(raw || '[]')

    const id = Date.now().toString()
    const record = { id, createdAt: new Date().toISOString(), ...body }

    list.unshift(record)

    await fs.promises.writeFile(dataPath, JSON.stringify(list, null, 2), 'utf-8')

    return NextResponse.json(record, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to save application' }, { status: 500 })
  }
}
