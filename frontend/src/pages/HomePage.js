import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  UserGroupIcon, 
  MapPinIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { getPopularItems } from '../data/inventoryData';

const HomePage = () => {
  const featuredItems = getPopularItems(4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
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
                  to="/inventory" 
                  className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-primary-900 flex items-center gap-2 text-lg px-8 py-4"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  Browse Our Inventory
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <Link 
                  to="/requests" 
                  className="btn-secondary border-yellow-500 text-yellow-500 hover:bg-yellow-50 flex items-center gap-2 text-lg px-8 py-4"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="card p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4 text-center">{item.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">${item.price}</span>
                  <span className="text-sm text-gray-500">per {item.unit}</span>
                </div>
                <button className="w-full btn-secondary text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/inventory" 
              className="btn-primary text-lg px-8 py-3 inline-flex items-center gap-2"
            >
              View All Items
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
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
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600">
                Built by Dayemi for the Carbondale community. Your requests and feedback shape our inventory.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPinIcon className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Local & Accessible</h3>
              <p className="text-gray-600">
                Visit us at Illinois Ave or browse online. We're part of your neighborhood.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-8 w-8 text-accent-600" />
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
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sign up today to start placing orders and requesting new items. It's free and takes just a minute!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-primary-900 text-lg px-8 py-3"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/signin" 
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3"
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
                <Link to="/inventory" className="block text-gray-400 hover:text-white">Browse Inventory</Link>
                <Link to="/requests" className="block text-gray-400 hover:text-white">Product Requests</Link>
                <Link to="/signup" className="block text-gray-400 hover:text-white">Sign Up</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Dayemi Community Food Network. Building community, one bulk order at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
