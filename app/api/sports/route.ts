import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

const dataPath = join(process.cwd(), 'public', 'data', 'sports.json')

function readSports() {
  try {
    const data = readFileSync(dataPath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeSports(data: any) {
  writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

export async function GET() {
  try {
    const sports = readSports()
    return NextResponse.json(sports)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sports' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const sports = readSports()
    
    const newSport = {
      id: Math.max(...sports.map((s: any) => s.id), 0) + 1,
      ...body,
      athleteCount: body.athleteCount || 0,
      competitions: body.competitions || [],
    }
    
    sports.push(newSport)
    writeSports(sports)
    
    return NextResponse.json(newSport, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create sport' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const sports = readSports()
    
    const index = sports.findIndex((s: any) => s.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Sport not found' }, { status: 404 })
    }
    
    sports[index] = { ...sports[index], ...body }
    writeSports(sports)
    
    return NextResponse.json(sports[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update sport' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    let sports = readSports()
    sports = sports.filter((s: any) => s.id !== id)
    writeSports(sports)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sport' }, { status: 500 })
  }
}
