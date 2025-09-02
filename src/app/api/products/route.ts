import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, category, unitPrice, currentStock } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        category,
        unitPrice: parseFloat(unitPrice),
        currentStock: parseInt(currentStock) || 0
      }
    })

    // Log the stock addition
    await prisma.productMovement.create({
      data: {
        productId: product.id,
        movementType: 'stock_added' as const,
        quantity: parseInt(currentStock) || 0,
        userId: parseInt(session.user.id),
        notes: 'Initial stock'
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}