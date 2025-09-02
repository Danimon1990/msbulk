import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { status, adminNotes, goal } = await request.json()
    
    // Build update data object with only provided fields
    const updateData: any = {}
    
    if (status !== undefined) {
      updateData.status = status
    }
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes
    }
    if (goal !== undefined) {
      updateData.goal = goal
    }
    
    const updatedRequest = await prisma.productRequest.update({
      where: { id: parseInt(params.id) },
      data: updateData
    })

    return NextResponse.json(updatedRequest)
  } catch (error) {
    console.error('Error updating request:', error)
    return NextResponse.json({ 
      error: 'Failed to update request', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.productRequest.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Request deleted successfully' })
  } catch (error) {
    console.error('Error deleting request:', error)
    return NextResponse.json({ error: 'Failed to delete request' }, { status: 500 })
  }
}
