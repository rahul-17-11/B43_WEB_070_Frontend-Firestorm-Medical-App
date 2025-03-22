import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AuthForm } from '../components/AuthForm';
import { ShoppingCart, Pill } from 'lucide-react';

export function Auth() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative">
            <ShoppingCart className="h-12 w-12 text-blue-600" />
            <Pill className="h-8 w-8 absolute -right-2 -bottom-2 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-gray-900">MedicalApp</span>
        </div>
      </div>
      <AuthForm mode={mode} onToggleMode={() => setMode(mode === 'signin' ? 'signup' : 'signin')} />
    </div>
  );
}