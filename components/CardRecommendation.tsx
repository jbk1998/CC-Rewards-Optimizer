import React from 'react';
import { Card } from '../types';
import { VisaIcon, AmexIcon, MastercardIcon } from './icons/CardIcons';

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
  const CardNetworkIcon = () => {
    switch (card.network) {
      case 'Visa': return <VisaIcon />;
      case 'Amex': return <AmexIcon />;
      case 'Mastercard': return <MastercardIcon />;
      default: return null;
    }
  };

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
            <p className="font-bold text-lg text-green-300">{rewardValue.toFixed(2)}¢</p>
            <p className="text-xs text-gray-500">per $100</p>
         </div>
         <div className="w-16 h-10 flex-shrink-0 flex items-center justify-center bg-gray-900 rounded-md overflow-hidden shadow-md">
            {card.imageUrl ? (
              <img src={card.imageUrl} alt={`${card.productName} card`} className="w-full h-full object-cover" />
            ) : (
              <CardNetworkIcon />
            )}
         </div>
      </div>
    </div>
  );
};

export default CardRecommendation;