import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  CogIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Admin Panel
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage products, track inventory, and fulfill community requests for the Dayemi Community Food Network.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Authentication Required Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900">Admin Access Required</h3>
              <p className="text-yellow-700">
                This area is restricted to authorized administrators of the Dayemi Community Food Network.
                Please sign in with your admin credentials to access management features.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/signin"
              className="btn-primary bg-yellow-600 hover:bg-yellow-700"
            >
              Sign In as Admin
            </Link>
          </div>
        </div>

        {/* Admin Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Inventory Management */}
          <div className="card p-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCartIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Inventory Management</h3>
            <p className="text-gray-600 mb-6">
              Add new products, update pricing, manage stock levels, and track inventory for the community.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div>• Add/edit bulk items</div>
              <div>• Update pricing and descriptions</div>
              <div>• Manage stock quantities</div>
              <div>• Set availability status</div>
            </div>
          </div>

          {/* Community Requests */}
          <div className="card p-8">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
              <UserGroupIcon className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Requests</h3>
            <p className="text-gray-600 mb-6">
              Review and manage product requests from community members. Approve popular items and track demand.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div>• Review new requests</div>
              <div>• Approve/deny items</div>
              <div>• Track request popularity</div>
              <div>• Manage request status</div>
            </div>
          </div>

          {/* Analytics & Reports */}
          <div className="card p-8">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6">
              <ChartBarIcon className="h-8 w-8 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Reports</h3>
            <p className="text-gray-600 mb-6">
              View community engagement metrics, popular items, and generate reports for better decision making.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div>• Sales and inventory reports</div>
              <div>• Popular items tracking</div>
              <div>• Community engagement metrics</div>
              <div>• Export data for analysis</div>
            </div>
          </div>

          {/* User Management */}
          <div className="card p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <UserGroupIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">User Management</h3>
            <p className="text-gray-600 mb-6">
              Manage community members, handle account issues, and maintain user relationships.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div>• View member accounts</div>
              <div>• Handle account issues</div>
              <div>• Manage user roles</div>
              <div>• Community communications</div>
            </div>
          </div>

          {/* System Settings */}
          <div className="card p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <CogIcon className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">System Settings</h3>
            <p className="text-gray-600 mb-6">
              Configure platform settings, update business information, and manage system preferences.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div>• Platform configuration</div>
              <div>• Business information</div>
              <div>• Notification settings</div>
              <div>• System preferences</div>
            </div>
          </div>

          {/* Order Management */}
          <div className="card p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCartIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Management</h3>
            <p className="text-gray-600 mb-6">
              Process orders, manage pickups and deliveries, and handle customer service for the community.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div>• Process new orders</div>
              <div>• Manage order status</div>
              <div>• Handle pickups/deliveries</div>
              <div>• Customer service</div>
            </div>
          </div>
        </div>

        {/* Admin Contact Info */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Admin Access?</h3>
          <p className="text-gray-600 mb-6">
            If you're an authorized administrator for the Dayemi Community Food Network and need access to the admin panel, 
            please contact the system administrator or visit our Illinois Ave location.
          </p>
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
            <div className="text-gray-600">
              <p><strong>Location:</strong> Illinois Ave, Carbondale, IL</p>
              <p><strong>Hours:</strong> Daily 9AM - 6PM</p>
              <p><strong>Admin Support:</strong> Available during business hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

