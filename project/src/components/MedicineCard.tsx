import { motion } from 'framer-motion';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { Medicine } from '../types';

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
}

export function MedicineCard({ medicine, onAddToCart }: MedicineCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={medicine.imageUrl}
          alt={medicine.name}
          className="w-full h-48 object-cover"
        />
        {medicine.requiresPrescription && (
          <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            Prescription Required
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{medicine.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{medicine.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${medicine.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(medicine)}
            disabled={!medicine.inStock}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              medicine.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{medicine.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}