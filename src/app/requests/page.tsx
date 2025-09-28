'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { 
  HeartIcon, 
  PlusIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { fetchProductRequests, createProductRequest, supportProductRequest } from '@/lib/inventoryService'

interface ProductRequest {
  id: number
  productName: string
  description: string
  category: string
  requestedBy: string
  supporters: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export default function RequestsPage() {
  const { data: session } = useSession()
  const [requests, setRequests] = useState<ProductRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newRequest, setNewRequest] = useState({
    productName: '',
    description: '',
    category: ''
  })

  const categories = [
    'fruits', 'vegetables', 'grains', 'legumes', 'nuts', 
    'oils', 'spices', 'sweeteners', 'beverages', 'dairy', 'pantry'
  ]

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const data = await fetchProductRequests()
      setRequests(data)
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return

    const success = await createProductRequest(newRequest)
    if (success) {
      setNewRequest({ productName: '', description: '', category: '' })
      setShowCreateForm(false)
      fetchRequests()
    } else {
      alert('Failed to create request. Please try again.')
    }
  }

  const handleSupportRequest = async (requestId: number) => {
    if (!session) {
      alert('Please sign in to support requests.')
      return
    }

    const success = await supportProductRequest(requestId)
    if (success) {
      fetchRequests()
    } else {
      alert('Failed to support request. Please try again.')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Product Requests
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help shape our inventory! Request new items or support requests from other community members.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Request Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Request a New Product</h2>
            {!session && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-700 text-sm">
                  <Link href="/auth/signup" className="font-medium hover:underline">
                    Sign up
                  </Link> to request new products
                </p>
              </div>
            )}
          </div>

          {session ? (
            <>
              {!showCreateForm ? (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Request New Product
                </button>
              ) : (
                <form onSubmit={handleCreateRequest} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newRequest.productName}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, productName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., Organic Quinoa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        required
                        value={newRequest.category}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      required
                      value={newRequest.description}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Tell us more about this product and why you'd like to see it in our inventory..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Sign up to request new products for our community inventory
              </p>
              <Link href="/auth/signup" className="btn-primary">
                Sign Up Now
              </Link>
            </div>
          )}
        </div>

        {/* Community Requests */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Requests</h2>
          
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">No requests yet</p>
              <p className="text-gray-500">
                Be the first to request a new product for our community!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {request.productName}
                        </h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          {request.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{request.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Category: <span className="font-medium">{request.category}</span></span>
                        <span>Requested by: <span className="font-medium">{request.requestedBy}</span></span>
                        <span>Supporters: <span className="font-medium">{request.supporters}</span></span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => handleSupportRequest(request.id)}
                        disabled={!session || request.status !== 'pending'}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          session && request.status === 'pending'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <HeartIcon className="h-4 w-4" />
                        Support
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-600 py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Help Build Our Community Inventory
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Your requests help us understand what our community needs most. Together, we can build the perfect inventory for Carbondale!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-primary-900"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Request New Product
              </button>
            ) : (
              <Link
                href="/auth/signup"
                className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-primary-900"
              >
                <UserGroupIcon className="h-5 w-5 mr-2" />
                Join Our Community
              </Link>
            )}
            <Link
              href="/inventory"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600"
            >
              Browse Current Inventory
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}