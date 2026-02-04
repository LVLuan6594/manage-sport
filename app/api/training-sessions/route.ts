import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'public', 'data', 'training-sessions.json')

async function ensureFile() {
  if (!fs.existsSync(dataPath)) {
    await fs.promises.writeFile(dataPath, JSON.stringify([], null, 2))
  }
}

export async function GET(req: NextRequest) {
  try {
    await ensureFile()
    const raw = await fs.promises.readFile(dataPath, 'utf-8')
    const data = JSON.parse(raw || '[]')
    
    // Optional filter by athleteId
    const { searchParams } = new URL(req.url)
    const athleteId = searchParams.get('athleteId')
    
    if (athleteId) {
      return NextResponse.json(data.filter((item: any) => item.athleteId === athleteId))
    }
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureFile()
    const body = await req.json()
    const raw = await fs.promises.readFile(dataPath, 'utf-8')
    const list = JSON.parse(raw || '[]')

    const session = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...body,
    }

    list.unshift(session)
    await fs.promises.writeFile(dataPath, JSON.stringify(list, null, 2))

    return NextResponse.json(session, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to save session' }, { status: 500 })
  }
}
