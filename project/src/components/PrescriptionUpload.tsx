import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Check } from 'lucide-react';

interface PrescriptionUploadProps {
  onUpload: (file: File) => void;
}

export function PrescriptionUpload({ onUpload }: PrescriptionUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-sm"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Upload Prescription
        </h2>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Prescription preview"
                className="max-h-64 mx-auto rounded"
              />
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mt-4 flex items-center justify-center text-green-600">
                <Check className="w-5 h-5 mr-2" />
                <span>Prescription uploaded successfully</span>
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop your prescription here
              </p>
              <p className="text-sm text-gray-500">or</p>
              <label className="mt-2 inline-block">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      handleFile(files[0]);
                    }
                  }}
                />
                <span className="cursor-pointer text-blue-600 hover:text-blue-700">
                  Browse files
                </span>
              </label>
            </>
          )}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Supported formats: JPG, PNG, PDF. Maximum file size: 10MB
        </p>
      </motion.div>
    </div>
  );
}