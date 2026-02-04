/**
 * API Utilities
 * Hàm tiện ích cho các API route handlers
 */

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * File Operations - Generic reusable functions
 */
export async function readDataFile(filename: string): Promise<any[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', filename)
    const data = await fs.promises.readFile(filePath, 'utf-8')
    return JSON.parse(data || '[]')
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return []
  }
}

export async function writeDataFile(filename: string, data: any[]): Promise<void> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', filename)
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error(`Error writing ${filename}:`, error)
    throw new ApiError(500, `Failed to save ${filename}`)
  }
}

/**
 * Response Handlers
 */
export function successResponse<T>(data: T, statusCode: number = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status: statusCode })
}

export function errorResponse(message: string, statusCode: number = 500): NextResponse {
  return NextResponse.json({ success: false, error: message }, { status: statusCode })
}

export function listResponse<T>(data: T[], total: number = data.length): NextResponse {
  return NextResponse.json({ success: true, data, total }, { status: 200 })
}

/**
 * CRUD Handlers
 */
export async function handleGetAll(filename: string): Promise<NextResponse> {
  try {
    const data = await readDataFile(filename)
    return listResponse(data)
  } catch (error) {
    return errorResponse('Failed to fetch data', 500)
  }
}

export async function handleCreate<T extends { id?: string | number }>(
  filename: string,
  body: any,
  generateId?: () => string | number
): Promise<NextResponse> {
  try {
    const data = await readDataFile(filename)
    const newItem: T = {
      ...body,
      id: generateId ? generateId() : Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    data.unshift(newItem)
    await writeDataFile(filename, data)
    return successResponse(newItem, 201)
  } catch (error) {
    return errorResponse('Failed to create item', 500)
  }
}

export async function handleUpdate<T extends { id: string | number }>(
  filename: string,
  body: T
): Promise<NextResponse> {
  try {
    const data = await readDataFile(filename)
    const index = data.findIndex((item: any) => item.id === body.id)
    if (index === -1) {
      return errorResponse('Item not found', 404)
    }
    data[index] = { ...data[index], ...body }
    await writeDataFile(filename, data)
    return successResponse(data[index])
  } catch (error) {
    return errorResponse('Failed to update item', 500)
  }
}

export async function handleDelete(filename: string, id: string | number): Promise<NextResponse> {
  try {
    const data = await readDataFile(filename)
    const index = data.findIndex((item: any) => item.id === id)
    if (index === -1) {
      return errorResponse('Item not found', 404)
    }
    const deleted = data.splice(index, 1)
    await writeDataFile(filename, data)
    return successResponse(deleted[0])
  } catch (error) {
    return errorResponse('Failed to delete item', 500)
  }
}

/**
 * Request Validators
 */
export async function validateRequest(req: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE'): Promise<any> {
  if (req.method !== method) {
    throw new ApiError(405, `Method ${req.method} not allowed`)
  }

  if (['POST', 'PUT'].includes(method)) {
    try {
      return await req.json()
    } catch {
      throw new ApiError(400, 'Invalid JSON body')
    }
  }

  return null
}

export function validateId(id: string | number | undefined): string | number {
  if (!id) {
    throw new ApiError(400, 'ID is required')
  }
  return id
}

export function validateRequired(value: any, fieldName: string): void {
  if (!value || (typeof value === 'string' && !value.trim())) {
    throw new ApiError(400, `${fieldName} is required`)
  }
}

/**
 * Error Handler Middleware
 */
export async function withErrorHandling(handler: () => Promise<NextResponse>): Promise<NextResponse> {
  try {
    return await handler()
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode)
    }
    console.error('Unexpected error:', error)
    return errorResponse('An unexpected error occurred', 500)
  }
}
