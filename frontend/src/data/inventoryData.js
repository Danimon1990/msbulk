// Inventory data for Community Food Network
// Add new items here as you expand your inventory

export const inventoryCategories = [
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
];

export const inventoryItems = [
  // Add your real inventory items here
  // Example: Your organic bananas
  {
    id: 1,
    name: "Organic Bananas",
    category: "fruits",
    price: 3.99,
    unit: "per bunch (6-8 bananas)",
    image: "🍌",
    description: "Fresh organic bananas, perfect for snacking or smoothies",
    inStock: true,
    stockQuantity: 24,
    supplier: "Local Organic Farm",
    origin: "Carbondale Area",
    nutritionInfo: "Rich in potassium, vitamin C, and fiber",
    storageInstructions: "Store at room temperature until ripe, then refrigerate",
    popularity: 95,
    tags: ["organic", "local", "fresh", "healthy"]
  }
  
  // Add more real items here as you get them in stock
  // Just copy the structure above and modify the details
];

// Helper functions for inventory management
export const getItemsByCategory = (categoryId) => {
  if (categoryId === 'all') return inventoryItems;
  return inventoryItems.filter(item => item.category === categoryId);
};

export const getPopularItems = (limit = 6) => {
  return inventoryItems
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getInStockItems = () => {
  return inventoryItems.filter(item => item.inStock);
};

export const searchItems = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return inventoryItems.filter(item => 
    item.name.toLowerCase().includes(term) ||
    item.description.toLowerCase().includes(term) ||
    item.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

// Function to add new items (for future use)
export const addNewItem = (newItem) => {
  const id = Math.max(...inventoryItems.map(item => item.id)) + 1;
  inventoryItems.push({
    id,
    ...newItem,
    popularity: 50, // Default popularity for new items
    tags: newItem.tags || []
  });
  return inventoryItems;
};

// Function to update stock quantities
export const updateStock = (itemId, newQuantity) => {
  const item = inventoryItems.find(item => item.id === itemId);
  if (item) {
    item.stockQuantity = newQuantity;
    item.inStock = newQuantity > 0;
  }
  return item;
};
