import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if request exists
    const productRequest = await prisma.productRequest.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!productRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      )
    }

    // Check if user already supported this request
    const existingSupport = await prisma.requestSupport.findUnique({
      where: {
        userId_requestId: {
          userId: parseInt(session.user.id),
          requestId: parseInt(params.id)
        }
      }
    })

    if (existingSupport) {
      return NextResponse.json(
        { error: 'Already supported this request' },
        { status: 400 }
      )
    }

    const support = await prisma.requestSupport.create({
      data: {
        userId: parseInt(session.user.id),
        requestId: parseInt(params.id)
      }
    })

    return NextResponse.json(support, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to support request' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.requestSupport.delete({
      where: {
        userId_requestId: {
          userId: parseInt(session.user.id),
          requestId: parseInt(params.id)
        }
      }
    })

    return NextResponse.json({ message: 'Support removed successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove support' },
      { status: 500 }
    )
  }
}