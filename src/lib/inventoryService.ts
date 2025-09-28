// Service to connect frontend components to existing API endpoints

export interface Product {
  id: number
  name: string
  description: string
  category: string
  unitPrice: string | number
  currentStock: number
  unitsPerCase: number
  unitSize: string
  totalUnits: number
  soldUnits: number
  createdAt: string
}

export interface InventoryItem {
  id: number
  name: string
  category: string
  price: number
  unit: string
  image: string
  description: string
  inStock: boolean
  stockQuantity: number
  supplier: string
  origin: string
  nutritionInfo: string
  storageInstructions: string
  popularity: number
  tags: string[]
}

export interface ProductRequest {
  id: number
  productName: string
  description: string
  category: string
  requestedBy: string
  supporters: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

// Convert API product to frontend inventory item format
export const convertProductToInventoryItem = (product: Product): InventoryItem => {
  const categoryMap: Record<string, string> = {
    'fruits': 'fruits',
    'vegetables': 'vegetables',
    'grains': 'grains',
    'legumes': 'legumes',
    'nuts': 'nuts',
    'oils': 'oils',
    'spices': 'spices',
    'sweeteners': 'sweeteners',
    'beverages': 'beverages',
    'dairy': 'dairy',
    'pantry': 'pantry'
  }

  const imageMap: Record<string, string> = {
    'fruits': '🍌',
    'vegetables': '🥕',
    'grains': '🌾',
    'legumes': '🫘',
    'nuts': '🥜',
    'oils': '🫒',
    'spices': '🌶️',
    'sweeteners': '🍯',
    'beverages': '☕',
    'dairy': '🥛',
    'pantry': '🏺'
  }

  const remainingStock = (product.totalUnits || 0) - (product.soldUnits || 0)
  
  return {
    id: product.id,
    name: product.name,
    category: categoryMap[product.category] || 'pantry',
    price: typeof product.unitPrice === 'string' ? parseFloat(product.unitPrice) : product.unitPrice,
    unit: product.unitSize || 'unit',
    image: imageMap[product.category] || '🏺',
    description: product.description,
    inStock: remainingStock > 0,
    stockQuantity: remainingStock,
    supplier: 'Community Food Network',
    origin: 'Local & Imported',
    nutritionInfo: 'Quality assured products',
    storageInstructions: 'Store according to product type',
    popularity: Math.min(95, Math.max(50, 100 - (product.soldUnits || 0) * 2)), // Calculate popularity based on sales
    tags: [product.category, 'bulk', 'community']
  }
}

// Fetch products from API
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/products')
    const data = await response.json()
    
    if (response.ok && Array.isArray(data)) {
      return data
    } else {
      console.error('Failed to fetch products:', data.error || 'Unknown error')
      return []
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

// Fetch inventory items (converted from products)
export const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
  const products = await fetchProducts()
  return products.map(convertProductToInventoryItem)
}

// Fetch product requests
export const fetchProductRequests = async (): Promise<ProductRequest[]> => {
  try {
    const response = await fetch('/api/requests')
    const data = await response.json()
    
    if (response.ok && Array.isArray(data)) {
      return data
    } else {
      console.error('Failed to fetch requests:', data.error || 'Unknown error')
      return []
    }
  } catch (error) {
    console.error('Failed to fetch requests:', error)
    return []
  }
}

// Create a new product request
export const createProductRequest = async (requestData: {
  productName: string
  description: string
  category: string
}): Promise<boolean> => {
  try {
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    return response.ok
  } catch (error) {
    console.error('Failed to create request:', error)
    return false
  }
}

// Support a product request
export const supportProductRequest = async (requestId: number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/requests/${requestId}/support`, {
      method: 'POST',
    })

    return response.ok
  } catch (error) {
    console.error('Failed to support request:', error)
    return false
  }
}

// Place an order
export const placeOrder = async (productId: number, quantity: number): Promise<boolean> => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    })

    return response.ok
  } catch (error) {
    console.error('Failed to place order:', error)
    return false
  }
}
