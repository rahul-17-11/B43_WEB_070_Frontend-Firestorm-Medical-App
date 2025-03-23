import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pill, DollarSign, Info, BookOpen, X } from "lucide-react";

interface Medicine {
  name: string;
  price: number | string;
  description: string;
  usage: string;
}

interface MedicineSearchResultsProps {
  medicines: Medicine[];
}

export function MedicineSearchResults({
  medicines,
}: MedicineSearchResultsProps) {
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((medicine, index) => (
          <motion.div
            key={`${medicine.name}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedMedicine(medicine)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Pill className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {medicine.name}
                  </h3>
                </div>
                <div className="text-green-600 dark:text-green-400 font-semibold">
                  {typeof medicine.price === "number"
                    ? `₹${medicine.price.toFixed(2)}`
                    : medicine.price}
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-2">
                {medicine.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Medicine Details Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedMedicine.name}
                </h2>
                <button
                  onClick={() => setSelectedMedicine(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold">
                    Price:{" "}
                    {typeof selectedMedicine.price === "number"
                      ? `$${selectedMedicine.price.toFixed(2)}`
                      : selectedMedicine.price}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-semibold">Description</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 pl-7">
                    {selectedMedicine.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-semibold">Usage Instructions</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 pl-7">
                    {selectedMedicine.usage}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedMedicine(null)}
                  className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
