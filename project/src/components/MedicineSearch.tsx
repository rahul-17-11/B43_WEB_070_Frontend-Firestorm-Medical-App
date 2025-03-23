import React, { useState } from "react";
import { Search, Loader } from "lucide-react";
import { generateContent } from "../gemini/generateContent";
import { MedicineSearchResults } from "./MedicineSearchResults";
import { DashboardLayout } from "./DashboardLayout";

interface Medicine {
  name: string;
  price: number | string;
  description: string;
  usage: string;
}

export function MedicineSearch() {
  const [symptoms, setSymptoms] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const prompt = `Provide a JSON array of objects, where each object represents a suitable medicine for the following symptoms: "${symptoms}". Each object should contain the medicine's "name", "price", "description", and "usage". Ensure that the medicines listed are available in India. Return ONLY the JSON array without backticks or language specifiers.`;

      const response = await generateContent(prompt);
      const medicineList = JSON.parse(response);
      setMedicines(medicineList);
    } catch (err) {
      setError("Failed to fetch medicine recommendations. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Find Medicines by Symptoms
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            Describe your symptoms in detail, and we'll recommend suitable
            medications available in India.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSearch}>
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Enter your symptoms (e.g., headache, fever, sore throat)"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-base"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !symptoms.trim()}
                className={`w-full py-3 px-6 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center ${
                  loading || !symptoms.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search Medicines"
                )}
              </button>
            </form>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-5 rounded-lg mb-6 border border-red-100 dark:border-red-800/50 flex items-start">
            <div className="flex-1">{error}</div>
          </div>
        )}

        {medicines.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Recommended Medicines
            </h3>
            <MedicineSearchResults medicines={medicines} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
