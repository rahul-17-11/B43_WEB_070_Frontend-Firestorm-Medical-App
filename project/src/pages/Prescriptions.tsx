import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Upload,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  Download,
  Eye,
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { PrescriptionUpload } from '../components/PrescriptionUpload';

interface Prescription {
  id: string;
  uploadDate: string;
  expiryDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  doctorName: string;
  medications: string[];
  imageUrl: string;
}

const mockPrescriptions: Prescription[] = [
  {
    id: 'PRE-001',
    uploadDate: '2024-03-15',
    expiryDate: '2024-09-15',
    status: 'approved',
    doctorName: 'Dr. Sarah Johnson',
    medications: ['Amoxicillin 500mg', 'Ibuprofen 400mg'],
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PRE-002',
    uploadDate: '2024-03-14',
    expiryDate: '2024-06-14',
    status: 'pending',
    doctorName: 'Dr. Michael Chen',
    medications: ['Lisinopril 10mg'],
    imageUrl: 'https://images.unsplash.com/photo-1583912267550-d6c2ac4b0154?auto=format&fit=crop&w=800&q=80',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-800',
};

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: AlertCircle,
  expired: Calendar,
};

export function Prescriptions() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPrescriptions = mockPrescriptions.filter((prescription) => {
    const matchesSearch = prescription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medications.some(med => med.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpload = (file: File) => {
    console.log('Uploading prescription:', file);
    setIsUploadModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
            <p className="mt-1 text-gray-600">
              Manage and track your medical prescriptions
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Prescription
          </button>
        </div>

        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-xl">
              <PrescriptionUpload onUpload={handleUpload} />
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prescriptions..."
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="expired">Expired</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="divide-y">
            {filteredPrescriptions.map((prescription) => {
              const StatusIcon = statusIcons[prescription.status];
              return (
                <motion.div
                  key={prescription.id}
                  initial={false}
                  animate={{ height: selectedPrescription === prescription.id ? 'auto' : 'auto' }}
                  className="p-4"
                >
                  <div
                    onClick={() => setSelectedPrescription(
                      selectedPrescription === prescription.id ? null : prescription.id
                    )}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${statusColors[prescription.status]}`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{prescription.id}</h3>
                          <p className="text-sm text-gray-600">
                            {prescription.doctorName} • Uploaded on {new Date(prescription.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${
                          selectedPrescription === prescription.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {selectedPrescription === prescription.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 pl-14"
                    >
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Prescribed Medications</h4>
                            <ul className="space-y-1">
                              {prescription.medications.map((medication, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                  • {medication}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Prescription Details</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                              <p>Expiry Date: {new Date(prescription.expiryDate).toLocaleDateString()}</p>
                              <p>Status: {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative h-48 rounded-lg overflow-hidden">
                          <img
                            src={prescription.imageUrl}
                            alt="Prescription"
                            className="w-full h-full object-cover"
                          />
                          <button
                            className="absolute bottom-2 right-2 bg-white bg-opacity-90 p-2 rounded-lg shadow-md hover:bg-opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(prescription.imageUrl, '_blank');
                            }}
                          >
                            <Eye className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>

                        <div className="pt-4 flex justify-end space-x-4">
                          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                            Download PDF
                          </button>
                          {prescription.status === 'approved' && (
                            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                              Order Medications
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