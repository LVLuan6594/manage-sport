import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'public', 'data', 'training-plans.json')

async function ensureFile() {
  if (!fs.existsSync(dataPath)) {
    await fs.promises.writeFile(dataPath, JSON.stringify([], null, 2))
  }
}

export async function GET() {
  try {
    await ensureFile()
    const raw = await fs.promises.readFile(dataPath, 'utf-8')
    const data = JSON.parse(raw || '[]')
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

    const plan = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...body,
    }

    list.unshift(plan)
    await fs.promises.writeFile(dataPath, JSON.stringify(list, null, 2))

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to save plan' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await ensureFile()
    const body = await req.json()
    const raw = await fs.promises.readFile(dataPath, 'utf-8')
    let list = JSON.parse(raw || '[]')

    list = list.map((item: any) =>
      item.id === body.id ? { ...item, ...body } : item
    )

    await fs.promises.writeFile(dataPath, JSON.stringify(list, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to update plan' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await ensureFile()
    const { id } = await req.json()
    const raw = await fs.promises.readFile(dataPath, 'utf-8')
    let list = JSON.parse(raw || '[]')

    list = list.filter((item: any) => item.id !== id)
    await fs.promises.writeFile(dataPath, JSON.stringify(list, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to delete plan' }, { status: 500 })
  }
}
