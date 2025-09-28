// Future inventory management component
// This will be used when you want to add an admin interface for managing inventory

import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const InventoryManager = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    unit: '',
    description: '',
    supplier: '',
    origin: '',
    stockQuantity: '',
    image: '📦'
  });

  const handleAddItem = () => {
    // This would integrate with your backend API
    console.log('Adding new item:', newItem);
    alert('Inventory management will be connected to your backend system. For now, add items directly to the inventoryData.js file.');
    setIsAddingItem(false);
    setNewItem({
      name: '',
      category: '',
      price: '',
      unit: '',
      description: '',
      supplier: '',
      origin: '',
      stockQuantity: '',
      image: '📦'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Inventory Management</h3>
        <button
          onClick={() => setIsAddingItem(!isAddingItem)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add New Item
        </button>
      </div>

      {isAddingItem && (
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Add New Inventory Item</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Organic Bananas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="fruits">Fresh Fruits</option>
                <option value="vegetables">Fresh Vegetables</option>
                <option value="grains">Grains & Cereals</option>
                <option value="legumes">Legumes & Beans</option>
                <option value="nuts">Nuts & Seeds</option>
                <option value="oils">Oils & Vinegars</option>
                <option value="spices">Spices & Seasonings</option>
                <option value="sweeteners">Sweeteners</option>
                <option value="beverages">Beverages</option>
                <option value="dairy">Dairy Alternatives</option>
                <option value="pantry">Pantry Staples</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="12.99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                type="text"
                value={newItem.unit}
                onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="per 5lb bag"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe the item..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <input
                type="text"
                value={newItem.supplier}
                onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Local Organic Farm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={newItem.stockQuantity}
                onChange={(e) => setNewItem({...newItem, stockQuantity: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="25"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setIsAddingItem(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleAddItem}
              className="btn-primary"
            >
              Add Item
            </button>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Quick Add Instructions</h4>
        <p className="text-blue-700 text-sm mb-3">
          To add new items to your inventory, edit the <code className="bg-blue-100 px-1 rounded">src/data/inventoryData.js</code> file:
        </p>
        <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
          <li>Open the inventoryData.js file</li>
          <li>Add new items to the inventoryItems array</li>
          <li>Use the existing items as templates</li>
          <li>Save the file and refresh your browser</li>
        </ol>
      </div>
    </div>
  );
};

export default InventoryManager;

