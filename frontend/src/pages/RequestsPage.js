import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const RequestsPage = () => {
  const [newRequest, setNewRequest] = useState({
    product: '',
    description: '',
    quantity: '',
    urgency: 'normal'
  });

  const existingRequests = [
    {
      id: 1,
      product: "Organic Oatmeal",
      description: "Looking for bulk organic rolled oats for our family",
      requestedBy: "Sarah M.",
      votes: 12,
      status: "pending",
      dateRequested: "2 days ago",
      category: "grains"
    },
    {
      id: 2,
      product: "Coconut Oil",
      description: "Need high-quality coconut oil for cooking",
      requestedBy: "Mike R.",
      votes: 8,
      status: "approved",
      dateRequested: "1 week ago",
      category: "oils"
    },
    {
      id: 3,
      product: "Chia Seeds",
      description: "Would love to have chia seeds available for smoothies",
      requestedBy: "Jennifer L.",
      votes: 15,
      status: "pending",
      dateRequested: "3 days ago",
      category: "seeds"
    },
    {
      id: 4,
      product: "Organic Cacao Powder",
      description: "For making healthy chocolate treats",
      requestedBy: "David K.",
      votes: 6,
      status: "pending",
      dateRequested: "5 days ago",
      category: "superfoods"
    }
  ];

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    // This would normally require authentication
    alert('Please sign up to submit product requests. Click "Sign Up" in the top navigation to get started!');
  };

  const handleVote = (requestId) => {
    // This would normally require authentication
    alert('Please sign up to vote on product requests. Your voice matters in building our community inventory!');
  };

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
              Help shape our community inventory by requesting new products. 
              <span className="font-semibold text-primary-600"> Vote on requests</span> and 
              <span className="font-semibold text-primary-600"> submit your own</span> to help us serve Carbondale better.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sign-up reminder */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3">
            <UserIcon className="h-8 w-8 text-primary-600" />
            <div>
              <h3 className="text-lg font-semibold text-primary-900">Join the Conversation!</h3>
              <p className="text-primary-700">
                Sign up to submit your own product requests and vote on items you'd like to see in our inventory. 
                Your input helps us build a better community marketplace.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/signup"
              className="btn-primary"
            >
              Sign Up to Participate
            </Link>
          </div>
        </div>

        {/* Submit New Request Form */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <PlusIcon className="h-6 w-6 text-primary-600" />
            Request a New Product
          </h2>
          <form onSubmit={handleSubmitRequest} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="product"
                  value={newRequest.product}
                  onChange={(e) => setNewRequest({...newRequest, product: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Organic Quinoa"
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  value={newRequest.quantity}
                  onChange={(e) => setNewRequest({...newRequest, quantity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 5lb bag"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={newRequest.description}
                onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us why you'd like this product and how you'd use it..."
                required
              />
            </div>

            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level
              </label>
              <select
                id="urgency"
                value={newRequest.urgency}
                onChange={(e) => setNewRequest({...newRequest, urgency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">Low - Would be nice to have</option>
                <option value="normal">Normal - Would like to have soon</option>
                <option value="high">High - Really need this item</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-primary w-full md:w-auto"
            >
              Submit Request
            </button>
          </form>
        </div>

        {/* Existing Requests */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HeartIcon className="h-6 w-6 text-primary-600" />
            Community Requests
          </h2>
          
          <div className="space-y-6">
            {existingRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{request.product}</h3>
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Requested by {request.requestedBy}</span>
                      <span>•</span>
                      <span>{request.dateRequested}</span>
                      <span>•</span>
                      <span className="capitalize">{request.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote(request.id)}
                      className="flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-200 transition-colors duration-200"
                    >
                      <HeartIcon className="h-4 w-4" />
                      {request.votes}
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {request.status === 'approved' ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircleIcon className="h-4 w-4" />
                        Approved
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600 text-sm font-medium">
                        <ClockIcon className="h-4 w-4" />
                        Pending
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleVote(request.id)}
                    className="btn-secondary text-sm"
                  >
                    Vote for this item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-600 py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Voice Matters
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community to submit requests and vote on products you'd like to see in our inventory.
          </p>
          <Link
            to="/signup"
            className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-primary-900"
          >
            Join Our Community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;

