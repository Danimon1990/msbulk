import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let orders
    if (session.user.role === 'ADMIN') {
      orders = await prisma.order.findMany({
        include: {
          user: { select: { name: true, email: true } },
          product: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' }
      })
    } else {
      orders = await prisma.order.findMany({
        where: { userId: parseInt(session.user.id) },
        include: {
          product: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' }
      })
    }

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, quantity } = body

    // Check product availability
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (product.currentStock < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      )
    }

    const totalPrice = product.unitPrice.toNumber() * quantity

    // Create order and update stock in a transaction
    const [order] = await prisma.$transaction([
      prisma.order.create({
        data: {
          userId: parseInt(session.user.id),
          productId,
          quantity,
          unitPrice: product.unitPrice,
          totalPrice,
          status: 'confirmed' as const
        }
      }),
      prisma.product.update({
        where: { id: productId },
        data: {
          currentStock: {
            decrement: quantity
          }
        }
      }),
      prisma.productMovement.create({
        data: {
          productId,
          movementType: 'purchase' as const,
          quantity,
          userId: parseInt(session.user.id),
          notes: `Order purchase - ${quantity} units`
        }
      })
    ])

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}