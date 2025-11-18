import React from 'react';
import { Card } from '../types';
import CardImage from './CardImage';

interface CardWalletProps {
  cards: Card[];
  onToggleCard: (cardId: string) => void;
}

const CardWallet: React.FC<CardWalletProps> = ({ cards, onToggleCard }) => {
  return (
    <div className="mb-6 border-b border-gray-700 pb-6">
      <h3 className="text-lg font-bold text-white mb-3">Your Wallet</h3>
      <p className="text-sm text-gray-400 mb-4">Select the cards you own to include them in the recommendation.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 ${
              card.isActive ? 'bg-gray-700' : 'bg-gray-800/50 opacity-60'
            }`}
          >
            <div className="flex items-center overflow-hidden">
              <CardImage
                card={card}
                className="w-12 h-8 mr-3 flex-shrink-0"
                imageClassName="w-full h-full object-contain rounded-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">{card.productName}</p>
                <p className="text-xs text-gray-400 truncate">{card.issuer}</p>
              </div>
            </div>
            <label htmlFor={`toggle-${card.id}`} className="flex items-center cursor-pointer ml-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id={`toggle-${card.id}`}
                  className="sr-only peer"
                  checked={card.isActive}
                  onChange={() => onToggleCard(card.id)}
                />
                <div className="block bg-gray-600 peer-checked:bg-blue-600 w-10 h-6 rounded-full transition"></div>
                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full"></div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardWallet;
