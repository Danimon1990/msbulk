import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const requests = await prisma.productRequest.findMany({
      include: {
        user: { select: { name: true, email: true } },
        requestSupports: {
          include: {
            user: { select: { name: true, email: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate total requested amount for each request
    const requestsWithProgress = requests.map(request => {
      // Start with the initial requester's amount
      const initialAmount = request.amountWanted || 0
      
      // Add up all supporters' amounts (for now, we'll assume each supporter wants the same amount as the initial requester)
      // In the future, we could add a field to track individual supporter amounts
      const supportersAmount = (request.requestSupports?.length || 0) * (request.amountWanted || 0)
      
      const totalRequested = initialAmount + supportersAmount
      
      return {
        ...request,
        totalRequested,
        progressPercentage: request.goal ? Math.min(100, (totalRequested / request.goal) * 100) : 0,
        remainingNeeded: request.goal ? Math.max(0, request.goal - totalRequested) : 0
      }
    })

    return NextResponse.json(requestsWithProgress)
  } catch (error) {
    console.error('Requests API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests', details: error instanceof Error ? error.message : 'Unknown error' },
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
    const { productName, description, priceRange, amountWanted } = body

    const productRequest = await prisma.productRequest.create({
      data: {
        userId: parseInt(session.user.id),
        productName,
        description,
        priceRange,
        amountWanted: amountWanted ? parseFloat(amountWanted) : null,
        status: 'pending'
      }
    })

    return NextResponse.json(productRequest, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create request' },
      { status: 500 }
    )
  }
}