import { useSelector } from "react-redux";
import { MedicineCard } from "./MedicineCard";
import { RootState } from "../store";
import { Medicine } from "../types";

interface MedicineListProps {
  onAddToCart: (medicine: Medicine) => void;
}

export function MedicineList({ onAddToCart }: MedicineListProps) {
  const medicines = useSelector((state: RootState) => state.medicines.items);
  const loading = useSelector((state: RootState) => state.medicines.loading);
  const error = useSelector((state: RootState) => state.medicines.error);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading medicines...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
