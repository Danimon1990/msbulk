'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  UserGroupIcon, 
  MapPinIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { fetchInventoryItems, InventoryItem } from '@/lib/inventoryService'

export default function Home() {
  const { data: session } = useSession()
  const [featuredItems, setFeaturedItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedItems()
  }, [])

  const fetchFeaturedItems = async () => {
    try {
      const items = await fetchInventoryItems()
      // Get the 4 most popular items (highest popularity scores)
      const featured = items
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 4)
      setFeaturedItems(featured)
    } catch (error) {
      console.error('Failed to fetch featured items:', error)
      // Fallback to empty array if API fails
      setFeaturedItems([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
          `
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Hello <span className="text-yellow-300">Carbondale</span>! 👋
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-blue-100">
                In our efforts to build a solid, strong community, at{' '}
                <span className="font-semibold text-yellow-300">Dayemi</span>, we are building this project for you, for us, for everyone.
              </p>
              <p className="text-lg mb-12 text-blue-200">
                Check our bulk items and feel free to stop and visit at our building at{' '}
                <span className="font-semibold">Illinois Ave</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/inventory" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 text-lg px-8 py-4"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  Browse Our Inventory
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <Link 
                  href="/requests" 
                  className="bg-white hover:bg-gray-50 text-yellow-500 font-semibold py-3 px-6 rounded-lg border-2 border-yellow-500 transition-colors duration-200 flex items-center gap-2 text-lg px-8 py-4"
                >
                  <HeartIcon className="h-6 w-6" />
                  Request Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Bulk Items
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our selection of quality bulk items. No sign-up required to view, but you'll need to create an account to place orders.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading featured items...</span>
            </div>
          ) : featuredItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl mb-4 text-center">{item.image}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-blue-600">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">per {item.unit}</span>
                    </div>
                    <div className="mb-4">
                      {item.inStock ? (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{item.stockQuantity} in stock</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Out of stock</span>
                        </div>
                      )}
                    </div>
                    <Link 
                      href="/inventory"
                      className="w-full bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-600 transition-colors duration-200 text-sm block text-center"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link 
                  href="/inventory" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg px-8 py-3 inline-flex items-center gap-2"
                >
                  View All Items
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Building Our Inventory</h3>
              <p className="text-gray-600 mb-6">
                We're working on adding more items to our community inventory. Check back soon!
              </p>
              <Link 
                href="/requests" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <HeartIcon className="h-5 w-5" />
                Request Items
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Community Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Community Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building something special for Carbondale - a community-driven approach to bulk food purchasing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600">
                Built by Dayemi for the Carbondale community. Your requests and feedback shape our inventory.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPinIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Local & Accessible</h3>
              <p className="text-gray-600">
                Visit us at Illinois Ave or browse online. We're part of your neighborhood.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Assured</h3>
              <p className="text-gray-600">
                We carefully select our bulk items to ensure the best quality and value for our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sign up today to start placing orders and requesting new items. It's free and takes just a minute!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup" 
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg px-8 py-3"
            >
              Sign Up Now
            </Link>
            <Link 
              href="/auth/signin" 
              className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-white transition-colors duration-200 text-lg px-8 py-3"
            >
              Already a Member? Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Community Food Network</h3>
              <p className="text-gray-400">
                Building a stronger Carbondale community through bulk food purchasing.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Visit Us</h4>
              <p className="text-gray-400">
                Illinois Ave<br />
                Carbondale, IL<br />
                Open Daily 9AM - 6PM
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/inventory" className="block text-gray-400 hover:text-white">Browse Inventory</Link>
                <Link href="/requests" className="block text-gray-400 hover:text-white">Product Requests</Link>
                <Link href="/auth/signup" className="block text-gray-400 hover:text-white">Sign Up</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Dayemi Community Food Network. Building community, one bulk order at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}