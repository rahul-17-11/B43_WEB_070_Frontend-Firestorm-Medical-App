import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Pill,
  Clock,
  Shield,
  Truck,
  FileText,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Order medicines any time, day or night',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical information is fully protected',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your medicines delivered quickly',
    },
    {
      icon: FileText,
      title: 'Digital Prescriptions',
      description: 'Upload and manage prescriptions easily',
    },
  ];

  const benefits = [
    'Verified medicines from licensed pharmacies',
    'Automatic refill reminders',
    'Expert pharmacist consultation',
    'Competitive prices and discounts',
    'Secure payment options',
    'Real-time order tracking',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="px-4 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <Pill className="h-6 w-6 absolute -right-1 -bottom-1 text-blue-600" />
            </div>
            <span className="text-xl font-bold text-gray-900">MedicalApp</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6"
          >
            Your Health, Delivered with
            <span className="text-blue-600"> Care</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Get your medicines delivered to your doorstep with our secure and reliable
            online pharmacy service.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate('/auth')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              Start Your Journey
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="px-8 py-3 text-blue-600 hover:text-blue-700 flex items-center">
              Learn More
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose MedicalApp?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience healthcare reimagined with our comprehensive suite of features
              designed to make managing your medications easier than ever.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need in One Place
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => navigate('/auth')}
                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                Get Started Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                alt="Medical App Dashboard"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <ShoppingCart className="h-8 w-8 text-white" />
                  <Pill className="h-6 w-6 absolute -right-1 -bottom-1 text-white" />
                </div>
                <span className="text-xl font-bold">MedicalApp</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in healthcare delivery.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Safety Center</li>
                <li>Community Guidelines</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 MedicalApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}