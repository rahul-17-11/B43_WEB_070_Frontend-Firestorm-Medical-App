import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  FileText,
  Users,
  TrendingUp,
  Upload,
  Search,
  Clock,
  CreditCard,
} from 'lucide-react';
import { RootState } from '../store';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatCard } from '../components/StatCard';
import { QuickAction } from '../components/QuickAction';
import { SearchBar } from '../components/SearchBar';

export function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      change: '+12.5% from last month',
      icon: ShoppingBag,
      color: 'bg-blue-600',
    },
    {
      title: 'Active Prescriptions',
      value: '3',
      icon: FileText,
      color: 'bg-green-600',
    },
    {
      title: 'Saved Items',
      value: '12',
      icon: Users,
      color: 'bg-purple-600',
    },
    {
      title: 'Total Spent',
      value: '$1,245',
      change: '+8.3% from last month',
      icon: TrendingUp,
      color: 'bg-orange-600',
    },
  ];

  const quickActions = [
    {
      title: 'Upload Prescription',
      description: 'Submit a new prescription for processing',
      icon: Upload,
      onClick: () => console.log('Upload prescription'),
    },
    {
      title: 'Search Medicines',
      description: 'Browse our catalog of medicines',
      icon: Search,
      onClick: () => console.log('Search medicines'),
    },
    {
      title: 'Order History',
      description: 'View and track your past orders',
      icon: Clock,
      onClick: () => console.log('View history'),
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment options',
      icon: CreditCard,
      onClick: () => console.log('Manage payments'),
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.name}
          </h1>
          <p className="mt-1 text-gray-600">
            Here's what's happening with your medical supplies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <QuickAction key={action.title} {...action} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Search Medicines
          </h2>
          <SearchBar onSearch={(query) => console.log('Searching:', query)} />
        </div>
      </div>
    </DashboardLayout>
  );
}