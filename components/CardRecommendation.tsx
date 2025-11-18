import React from 'react';
import { Card } from '../types';
import CardImage from './CardImage';

interface CardRecommendationProps {
  card: Card;
  rank: number;
  rewardValue: number;
}

const getRankColor = (rank: number) => {
  if (rank === 1) return 'border-green-400 bg-green-900/30';
  if (rank === 2) return 'border-blue-400 bg-blue-900/30';
  if (rank === 3) return 'border-yellow-500 bg-yellow-900/30';
  return 'border-gray-600 bg-gray-700/30';
};

const CardRecommendation: React.FC<CardRecommendationProps> = ({ card, rank, rewardValue }) => {
  const rewardDollars = (rewardValue / 100).toFixed(2);
  const baseDollars = card.rewardProfile.baseRate.toFixed(2);
  const multiplier = (rewardValue / 100).toFixed(1);

  return (
    <div className={`flex items-center p-3 rounded-lg border-l-4 transition-all duration-300 hover:bg-gray-700/50 ${getRankColor(rank)}`}>
      <div className="flex-shrink-0 w-8 text-center">
        <span className="text-xl font-bold text-gray-300">{rank}</span>
      </div>
      <div className="flex-grow mx-4">
        <p className="font-semibold text-white">{card.productName}</p>
        <p className="text-sm text-gray-400">{card.issuer}</p>
      </div>
      <div className="flex items-center">
         <div className="text-right mr-4">
            <p className="font-bold text-lg text-green-300">${rewardDollars}</p>
            <p className="text-xs text-gray-400">{multiplier}x for this purchase</p>
            <p className="text-xs text-gray-500">Base: ${baseDollars}</p>
         </div>
         <CardImage
            card={card}
            className="w-16 h-10 flex-shrink-0 rounded-md overflow-hidden shadow-md"
            imageClassName="w-full h-full object-cover"
         />
      </div>
    </div>
  );
};

export default CardRecommendation;