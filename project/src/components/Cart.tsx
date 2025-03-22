import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const medicines = useSelector((state: RootState) => state.medicines.items);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
          >
            <div className="p-4 flex items-center justify-between border-b">
              <div className="flex items-center">
                <ShoppingCart className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const medicine = medicines.find((m) => m.id === item.medicineId);
                    if (!medicine) return null;

                    return (
                      <div
                        key={item.medicineId}
                        className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                      >
                        <img
                          src={medicine.imageUrl}
                          alt={medicine.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{medicine.name}</h3>
                          <p className="text-sm text-gray-600">
                            ${medicine.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  medicineId: item.medicineId,
                                  quantity: Math.max(0, item.quantity - 1),
                                })
                              )
                            }
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  medicineId: item.medicineId,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              dispatch(removeFromCart(item.medicineId))
                            }
                            className="p-1 hover:bg-red-100 text-red-600 rounded ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <button
                disabled={cartItems.length === 0}
                className={`w-full py-3 rounded-lg ${
                  cartItems.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold transition-colors`}
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}