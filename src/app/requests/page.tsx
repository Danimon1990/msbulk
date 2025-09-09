'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProductRequest {
  id: number
  productName: string
  description: string
  status: string
  createdAt: string
  user: {
    name: string
    email: string
  }
  requestSupports: Array<{
    user: {
      name: string
      email: string
    }
  }>
}

export default function Requests() {
  const { data: session } = useSession()
  const [requests, setRequests] = useState<ProductRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newRequest, setNewRequest] = useState({
    productName: '',
    description: '',
    priceRange: '',
    amountWanted: ''
  })
  const [supportedRequests, setSupportedRequests] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests')
      const data = await response.json()
      
      // Ensure we always have an array
      if (Array.isArray(data)) {
        setRequests(data)
        
        // Track which requests the current user has supported
        if (session) {
          const supported = new Set<number>()
          data.forEach((request: ProductRequest) => {
            if (request.requestSupports.some(support => support.user.email === session.user.email)) {
              supported.add(request.id)
            }
          })
          setSupportedRequests(supported)
        }
      } else {
        console.error('API returned non-array response:', data)
        setRequests([])
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
      setRequests([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      })

      if (response.ok) {
        setNewRequest({ productName: '', description: '', priceRange: '', amountWanted: '' })
        setShowForm(false)
        fetchRequests()
        alert('Request submitted successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to submit request: ${error.error}`)
      }
    } catch (error) {
      alert('Failed to submit request')
    }
  }

  const handleSupportRequest = async (requestId: number) => {
    if (!session) return

    try {
      const response = await fetch(`/api/requests/${requestId}/support`, {
        method: 'POST',
      })

      if (response.ok) {
        setSupportedRequests(prev => new Set(Array.from(prev).concat(requestId)))
        fetchRequests()
      } else {
        const error = await response.json()
        alert(`Failed to support request: ${error.error}`)
      }
    } catch (error) {
      alert('Failed to support request')
    }
  }

  const handleRemoveSupport = async (requestId: number) => {
    if (!session) return

    try {
      const response = await fetch(`/api/requests/${requestId}/support`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSupportedRequests(prev => {
          const newSet = new Set(prev)
          newSet.delete(requestId)
          return newSet
        })
        fetchRequests()
      } else {
        const error = await response.json()
        alert(`Failed to remove support: ${error.error}`)
      }
    } catch (error) {
      alert('Failed to remove support')
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view product requests</h2>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product Requests</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New Request'}
          </Button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Submit New Product Request</h2>
            <form onSubmit={handleSubmitRequest}>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <Input
                    value={newRequest.productName}
                    onChange={(e) => setNewRequest(prev => ({
                      ...prev,
                      productName: e.target.value
                    }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range (e.g., $2-3 per pound)
                  </label>
                  <Input
                    value={newRequest.priceRange}
                    onChange={(e) => setNewRequest(prev => ({
                      ...prev,
                      priceRange: e.target.value
                    }))}
                    placeholder="e.g., $2-3 per pound"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount Wanted (pounds)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    value={newRequest.amountWanted}
                    onChange={(e) => setNewRequest(prev => ({
                      ...prev,
                      amountWanted: e.target.value
                    }))}
                    placeholder="e.g., 5.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={newRequest.description}
                    onChange={(e) => setNewRequest(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    placeholder="Additional details about your request..."
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Submit Request</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">All Product Requests</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {requests.map((request) => (
              <div key={request.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {request.productName}
                    </h3>
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>Requested by {request.user.name}</span>
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex flex-col items-end">
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">
                        {request.requestSupports.length} supporters
                      </span>
                    </div>
                    
                    {session.user.email !== request.user.email && (
                      <div>
                        {supportedRequests.has(request.id) ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveSupport(request.id)}
                          >
                            Remove Support
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleSupportRequest(request.id)}
                          >
                            Support Request
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {requests.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No product requests found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}