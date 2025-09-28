'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ShoppingCartIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  UserIcon,
  StarIcon,
  MapPinIcon,
  InformationCircleIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'
import { fetchInventoryItems, InventoryItem } from '@/lib/inventoryService'

// Categories for filtering
const inventoryCategories = [
  { id: 'all', name: 'All Items', icon: '🛒' },
  { id: 'fruits', name: 'Fresh Fruits', icon: '🍌' },
  { id: 'vegetables', name: 'Fresh Vegetables', icon: '🥕' },
  { id: 'grains', name: 'Grains & Cereals', icon: '🌾' },
  { id: 'legumes', name: 'Legumes & Beans', icon: '🫘' },
  { id: 'nuts', name: 'Nuts & Seeds', icon: '🥜' },
  { id: 'oils', name: 'Oils & Vinegars', icon: '🫒' },
  { id: 'spices', name: 'Spices & Seasonings', icon: '🌶️' },
  { id: 'sweeteners', name: 'Sweeteners', icon: '🍯' },
  { id: 'beverages', name: 'Beverages', icon: '☕' },
  { id: 'dairy', name: 'Dairy Alternatives', icon: '🥛' },
  { id: 'pantry', name: 'Pantry Staples', icon: '🏺' }
]

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showDetails, setShowDetails] = useState<Record<number, boolean>>({})
  const [sortBy, setSortBy] = useState('popularity') // popularity, price, name

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const items = await fetchInventoryItems()
      setInventoryItems(items)
    } catch (error) {
      console.error('Failed to fetch inventory items:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleDetails = (itemId: number) => {
    setShowDetails(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const getFilteredItems = () => {
    let items = inventoryItems

    // Filter by category
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      items = items.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
      )
    }

    // Sort items
    items = [...items].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'popularity':
        default:
          return b.popularity - a.popularity
      }
    })

    return items
  }

  const filteredItems = getFilteredItems()

  const handleOrderClick = (item: InventoryItem) => {
    // This would normally check if user is logged in
    alert('Please sign up to place orders. Click "Sign Up" in the top navigation to get started!')
  }

  const renderStars = (popularity: number) => {
    const stars = Math.round(popularity / 20) // Convert 0-100 to 0-5 stars
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className={`h-4 w-4 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm text-gray-500 ml-1">({popularity}%)</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading inventory...</p>
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
              Community Inventory
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our bulk items available for the Carbondale community. 
              <span className="font-semibold text-primary-600"> No sign-up required to view</span>, 
              but you'll need an account to place orders.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items, suppliers, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {inventoryCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
              ))}
            </select>
          </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="popularity">Most Popular</option>
                <option value="price">Price: Low to High</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sign-up reminder */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserIcon className="h-6 w-6 text-primary-600" />
                      <div>
                <h3 className="font-semibold text-primary-900">Want to place an order?</h3>
                <p className="text-primary-700">Sign up for a free account to start ordering bulk items for pickup or delivery.</p>
              </div>
            </div>
            <Link
              href="/auth/signup"
              className="btn-primary whitespace-nowrap"
            >
              Sign Up Now
            </Link>
                      </div>
                      </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {inventoryItems.length} items
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${inventoryCategories.find(c => c.id === selectedCategory)?.name}`}
          </p>
                        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="card p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4 text-center">{item.image}</div>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                
                {/* Popularity Stars */}
                {renderStars(item.popularity)}
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
                  )}
                        </div>
                      </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-primary-600">${item.price}</span>
                  <span className="text-sm text-gray-500">per {item.unit}</span>
                </div>
                
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

              {/* Details Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => toggleDetails(item.id)}
                  className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {showDetails[item.id] ? (
                    <>
                      <EyeSlashIcon className="h-4 w-4" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <EyeIcon className="h-4 w-4" />
                      Show Details
                    </>
                  )}
                </button>

                {/* Expanded Details */}
                {showDetails[item.id] && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm space-y-2">
                    <div>
                      <span className="font-medium">Supplier:</span> {item.supplier}
                    </div>
                    <div>
                      <span className="font-medium">Origin:</span> {item.origin}
                    </div>
                    <div>
                      <span className="font-medium">Nutrition:</span> {item.nutritionInfo}
                    </div>
                    <div>
                      <span className="font-medium">Storage:</span> {item.storageInstructions}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <MapPinIcon className="h-4 w-4 text-primary-600" />
                      <span className="text-primary-600">Available for pickup at Illinois Ave</span>
                    </div>
                  </div>
                )}
          </div>

              <button
                onClick={() => handleOrderClick(item)}
                disabled={!item.inStock}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  item.inStock
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {item.inStock ? 'Order Now' : 'Out of Stock'}
              </button>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            {searchTerm || selectedCategory !== 'all' ? (
              <>
                <p className="text-gray-500 text-lg">No items found matching your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear filters
                </button>
              </>
            ) : (
              <div className="max-w-md mx-auto">
                <p className="text-gray-500 text-lg mb-4">
                  We're building our inventory! Check back soon for more items.
                </p>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <p className="text-primary-700 text-sm">
                    <strong>Currently available:</strong> Organic Bananas<br />
                    <strong>Coming soon:</strong> More fresh, local, and organic items
                  </p>
                </div>
                <Link
                  href="/requests"
                  className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium"
                >
                  Request items you'd like to see →
                </Link>
              </div>
            )}
            </div>
          )}
      </div>

      {/* Call to Action */}
      <div className="bg-primary-600 py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Ordering?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community today and start enjoying the benefits of bulk purchasing!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-primary-900"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Sign Up to Order
            </Link>
            <Link
              href="/requests"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600"
            >
              Request New Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}