import React from 'react';
import { MerchantPrediction } from '../types';

interface MerchantChoiceProps {
  prediction: MerchantPrediction;
  isSelected: boolean;
  onSelect: () => void;
}

const MerchantChoice: React.FC<MerchantChoiceProps> = ({ prediction, isSelected, onSelect }) => {
  const selectedClasses = 'bg-blue-600 border-blue-400 ring-2 ring-blue-400';
  const unselectedClasses = 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500';

  return (
    <button
      onClick={onSelect}
      className={`p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      <p className="font-bold text-white">{prediction.merchant_name}</p>
      <p className={`text-sm capitalize ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>{prediction.predicted_mcc_group}</p>
    </button>
  );
};

export default MerchantChoice;
