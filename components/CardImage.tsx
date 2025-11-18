import React from 'react';
import { Card } from '../types';
import { VisaIcon, AmexIcon, MastercardIcon } from './icons/CardIcons';

interface CardImageProps {
  card: Card;
  className: string; // This will be for the container
  imageClassName: string;
}

const CardNetworkIcon = ({ network }: { network: Card['network'] }) => {
  switch (network) {
    case 'Visa': return <VisaIcon />;
    case 'Amex': return <AmexIcon />;
    case 'Mastercard': return <MastercardIcon />;
    default: return null;
  }
};

const CardImage: React.FC<CardImageProps> = ({ card, className, imageClassName }) => {
  // If an imageUrl is provided, always attempt to render it.
  // If the path is wrong, the browser will show a broken image icon,
  // which is clearer feedback than the previous fallback logic.
  if (card.imageUrl) {
    return (
      <div className={className}>
        <img
          src={card.imageUrl}
          alt={`${card.productName} card`}
          className={imageClassName}
        />
      </div>
    );
  }

  // Only show the network icon if no imageUrl is specified in the card data.
  return (
    <div className={`${className} flex items-center justify-center bg-gray-900`}>
      <CardNetworkIcon network={card.network} />
    </div>
  );
};

export default CardImage;
