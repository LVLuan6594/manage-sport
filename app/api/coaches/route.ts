import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const coachesPath = path.join(process.cwd(), 'public/data/coaches.json')

function readCoaches() {
  try {
    const data = fs.readFileSync(coachesPath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeCoaches(data: any) {
  fs.writeFileSync(coachesPath, JSON.stringify(data, null, 2))
}

export async function GET() {
  try {
    const coaches = readCoaches()
    return NextResponse.json(coaches)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read coaches' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newCoach = await request.json()
    const coaches = readCoaches()
    
    const coach = {
      id: Date.now().toString(),
      ...newCoach,
      createdAt: new Date().toISOString(),
    }
    
    coaches.push(coach)
    writeCoaches(coaches)
    
    return NextResponse.json(coach, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create coach' }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const coaches = readCoaches()
    
    const index = coaches.findIndex((c: any) => c.id === id || c.name === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Coach not found' }, { status: 404 })
    }
    
    coaches[index] = { ...coaches[index], ...updateData }
    writeCoaches(coaches)
    
    return NextResponse.json(coaches[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update coach' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const coaches = readCoaches()
    
    const filteredCoaches = coaches.filter((c: any) => c.id !== id && c.name !== id)
    if (filteredCoaches.length === coaches.length) {
      return NextResponse.json({ error: 'Coach not found' }, { status: 404 })
    }
    
    writeCoaches(filteredCoaches)
    return NextResponse.json({ message: 'Coach deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete coach' }, { status: 400 })
  }
}
