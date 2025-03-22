export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  requiresPrescription: boolean;
  imageUrl: string;
}

export interface CartItem {
  medicineId: string;
  quantity: number;
  price: number;
}

export interface RootState {
  auth: AuthState;
  medicines: MedicinesState;
  cart: CartState;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface MedicinesState {
  items: Medicine[];
  loading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}