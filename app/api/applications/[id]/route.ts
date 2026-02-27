import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'public', 'data', 'applications.json')

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const raw = await fs.promises.readFile(dataPath, 'utf-8')
    const list = JSON.parse(raw || '[]')
    const record = list.find((r: any) => r.id === id)
    if (record) {
      return NextResponse.json(record)
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to read applications' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await req.json()
    const raw = await fs.promises.readFile(dataPath, 'utf-8')
    const list = JSON.parse(raw || '[]')
    const idx = list.findIndex((r: any) => r.id === id)
    if (idx === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    // merge update (only status for now)
    list[idx] = { ...list[idx], ...body }
    await fs.promises.writeFile(dataPath, JSON.stringify(list, null, 2), 'utf-8')
    return NextResponse.json(list[idx])
  } catch (error) {
    return NextResponse.json({ error: 'Unable to update application' }, { status: 500 })
  }
}
