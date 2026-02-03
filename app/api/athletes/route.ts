import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

const dataPath = join(process.cwd(), 'public', 'data', 'athletes.json')

function readAthletes() {
  try {
    const data = readFileSync(dataPath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeAthletes(data: any) {
  writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

export async function GET() {
  try {
    const athletes = readAthletes()
    return NextResponse.json(athletes)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch athletes' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const athletes = readAthletes()
    
    const newAthlete = {
      id: Math.max(...athletes.map((a: any) => a.id), 0) + 1,
      ...body,
      medals: body.medals || { gold: 0, silver: 0, bronze: 0 },
      injured: body.injured || false,
      potential: body.potential || true,
    }
    
    athletes.push(newAthlete)
    writeAthletes(athletes)
    
    return NextResponse.json(newAthlete, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create athlete' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const athletes = readAthletes()
    
    const index = athletes.findIndex((a: any) => a.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Athlete not found' }, { status: 404 })
    }
    
    athletes[index] = { ...athletes[index], ...body }
    writeAthletes(athletes)
    
    return NextResponse.json(athletes[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update athlete' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    let athletes = readAthletes()
    athletes = athletes.filter((a: any) => a.id !== id)
    writeAthletes(athletes)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete athlete' }, { status: 500 })
  }
}
