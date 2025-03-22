import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  Search,
  Filter,
  Download,
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-03-15',
    status: 'delivered',
    total: 156.99,
    items: [
      { name: 'Paracetamol 500mg', quantity: 2, price: 15.99 },
      { name: 'Vitamin C 1000mg', quantity: 1, price: 25.99 },
    ],
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-002',
    date: '2024-03-14',
    status: 'shipped',
    total: 89.99,
    items: [
      { name: 'First Aid Kit', quantity: 1, price: 45.99 },
      { name: 'Bandages', quantity: 2, price: 12.99 },
    ],
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-003',
    date: '2024-03-13',
    status: 'processing',
    total: 234.50,
    items: [
      { name: 'Blood Pressure Monitor', quantity: 1, price: 199.99 },
      { name: 'Digital Thermometer', quantity: 1, price: 34.51 },
    ],
  },
];

const statusColors = {
  processing: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusIcons = {
  processing: Clock,
  shipped: Package,
  delivered: CheckCircle,
  cancelled: XCircle,
};

export function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportOrders = () => {
    // Implementation for exporting orders
    console.log('Exporting orders...');
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="mt-1 text-gray-600">
              Manage and track your orders
            </p>
          </div>
          <button
            onClick={handleExportOrders}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="divide-y">
            {filteredOrders.map((order) => {
              const StatusIcon = statusIcons[order.status];
              return (
                <motion.div
                  key={order.id}
                  initial={false}
                  animate={{ height: selectedOrder === order.id ? 'auto' : 'auto' }}
                  className="p-4"
                >
                  <div
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${statusColors[order.status]}`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-600">
                            Ordered on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-900">
                          ${order.total.toFixed(2)}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${
                            selectedOrder === order.id ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {selectedOrder === order.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 pl-14"
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between text-sm"
                              >
                                <span className="text-gray-600">
                                  {item.quantity}x {item.name}
                                </span>
                                <span className="font-medium text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {order.trackingNumber && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              Tracking Information
                            </h4>
                            <p className="text-sm text-gray-600">
                              Tracking Number: {order.trackingNumber}
                            </p>
                          </div>
                        )}

                        <div className="pt-4 flex justify-end space-x-4">
                          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                            View Invoice
                          </button>
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                              Reorder
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}