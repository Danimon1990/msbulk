# Inventory Management Guide

## Current Inventory

Your Community Food Network currently shows only **real items** that you actually have in stock. This keeps customers focused on what's actually available and prevents disappointment.

## Adding New Real Items

When you get new products in stock, simply edit the `src/data/inventoryData.js` file.

### Step-by-Step Instructions

1. **Open the inventory file**
   ```
   frontend/src/data/inventoryData.js
   ```

2. **Add your new item to the inventoryItems array**
   ```javascript
   {
     id: 2, // Use the next available number (currently you have 1 item)
     name: "Your New Item",
     category: "fruits", // Choose from available categories
     price: 5.99,
     unit: "per lb",
     image: "🍎", // Use an emoji or "📦" for generic
     description: "Description of your item",
     inStock: true,
     stockQuantity: 20,
     supplier: "Your Supplier Name",
     origin: "Where it comes from",
     nutritionInfo: "Nutritional information",
     storageInstructions: "How to store it",
     popularity: 75, // 0-100 scale
     tags: ["organic", "local", "fresh"] // Relevant tags
   }
   ```

3. **Save the file and refresh your browser**

### Important Notes
- **Only add items you actually have in stock**
- **Keep quantities accurate** - update when items sell out
- **Remove items** when they're no longer available
- **Update prices** when they change

### Available Categories

- `fruits` - Fresh Fruits 🍌
- `vegetables` - Fresh Vegetables 🥕
- `grains` - Grains & Cereals 🌾
- `legumes` - Legumes & Beans 🫘
- `nuts` - Nuts & Seeds 🥜
- `oils` - Oils & Vinegars 🫒
- `spices` - Spices & Seasonings 🌶️
- `sweeteners` - Sweeteners 🍯
- `beverages` - Beverages ☕
- `dairy` - Dairy Alternatives 🥛
- `pantry` - Pantry Staples 🏺

### Example: Adding Organic Apples

```javascript
{
  id: 11,
  name: "Organic Apples",
  category: "fruits",
  price: 4.99,
  unit: "per 3lb bag",
  image: "🍎",
  description: "Fresh organic apples from local orchards",
  inStock: true,
  stockQuantity: 15,
  supplier: "Carbondale Orchards",
  origin: "Carbondale, IL",
  nutritionInfo: "Rich in fiber, vitamin C, and antioxidants",
  storageInstructions: "Store in cool, dry place or refrigerate",
  popularity: 85,
  tags: ["organic", "local", "fresh", "seasonal"]
}
```

### Managing Stock

To update stock quantities, simply change the `stockQuantity` value. The system will automatically show items as out of stock when quantity reaches 0.

### Popularity Scores

Use popularity scores (0-100) to help customers discover your best items:
- 90-100: Top sellers, featured prominently
- 70-89: Popular items
- 50-69: Average popularity
- 30-49: New or niche items
- 0-29: Items that might need promotion

### Tags

Use tags to help customers find items:
- `organic` - Certified organic items
- `local` - Sourced locally
- `fresh` - Fresh produce
- `bulk` - Available in bulk quantities
- `seasonal` - Seasonal availability
- `healthy` - Health-focused items
- `gluten-free` - Gluten-free options
- `vegan` - Vegan-friendly items

## Future Enhancements

When you're ready to scale, consider:
- Database integration for inventory management
- Admin dashboard for real-time updates
- Automated stock tracking
- Supplier integration
- Barcode scanning for quick updates

---

**Need help?** Contact the development team or visit us at Illinois Ave, Carbondale.
