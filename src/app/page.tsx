'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Community Food Network
        </h1>
        
        {session ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Welcome back, {session.user.name}!</h2>
              <p className="text-gray-600 mb-6">
                Access your community-driven bulk food purchasing platform features below.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Browse Inventory</h3>
                  <p className="text-sm text-blue-600 mb-4">
                    View available products and place orders
                  </p>
                  <Link href="/inventory">
                    <Button className="w-full">View Inventory</Button>
                  </Link>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Product Requests</h3>
                  <p className="text-sm text-green-600 mb-4">
                    Request new products and support others' requests
                  </p>
                  <Link href="/requests">
                    <Button className="w-full">View Requests</Button>
                  </Link>
                </div>
                
                {session.user.role === 'admin' && (
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Admin Panel</h3>
                    <p className="text-sm text-purple-600 mb-4">
                      Manage products, inventory, and user requests
                    </p>
                    <Link href="/admin">
                      <Button className="w-full">Admin Panel</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome to our community!</h2>
            <p className="text-gray-600 mb-6">
              Join our community-driven bulk food purchasing platform. Browse products, 
              place orders, and submit requests for new items.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold text-blue-800">For Members</h3>
                <p className="text-sm text-blue-600">
                  Browse inventory, place orders, and request new products
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <h3 className="font-semibold text-green-800">For Admins</h3>
                <p className="text-sm text-green-600">
                  Manage products, track inventory, and fulfill requests
                </p>
              </div>
            </div>
            <div className="text-center space-x-4">
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}