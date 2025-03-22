import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Truck,
  Shield,
  Mail,
  Phone,
  Home as HomeIcon,
  Save,
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ElementType;
  component: React.ComponentType;
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-semibold">
          JD
        </div>
        <div>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
            Change Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            defaultValue="john.doe@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            defaultValue="+1 (555) 123-4567"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            defaultValue="1990-01-01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Protect your account with 2FA</p>
            <p className="text-sm text-gray-600 mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Enable
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
            <span className="ml-3">Order updates</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
            <span className="ml-3">Prescription reminders</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            <span className="ml-3">Marketing emails</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
            <span className="ml-3">Order status</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
            <span className="ml-3">Delivery updates</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function PaymentSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-white rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/24</p>
            </div>
          </div>
          <button className="text-red-600 hover:text-red-700 font-medium">
            Remove
          </button>
        </div>
      </div>

      <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors">
        + Add New Payment Method
      </button>
    </div>
  );
}

function AddressSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <HomeIcon className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Default Address</span>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Edit
          </button>
        </div>
        <div className="text-gray-600">
          <p>123 Main Street</p>
          <p>Apt 4B</p>
          <p>New York, NY 10001</p>
          <p>United States</p>
        </div>
      </div>

      <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors">
        + Add New Address
      </button>
    </div>
  );
}

export function Settings() {
  const [activeSection, setActiveSection] = useState('profile');

  const sections: SettingsSection[] = [
    { id: 'profile', title: 'Profile', icon: User, component: ProfileSettings },
    { id: 'security', title: 'Security', icon: Lock, component: SecuritySettings },
    { id: 'notifications', title: 'Notifications', icon: Bell, component: NotificationSettings },
    { id: 'payment', title: 'Payment Methods', icon: CreditCard, component: PaymentSettings },
    { id: 'address', title: 'Addresses', icon: Truck, component: AddressSettings },
  ];

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component || ProfileSettings;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6 md:col-span-3">
              <ActiveComponent />

              <div className="mt-8 pt-6 border-t">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}