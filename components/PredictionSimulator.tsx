import React, { useState } from 'react';
import { predictMCC } from '../services/geminiService';
import { PredictionResponse, PredictionRequest, MerchantPrediction, Card } from '../types';
import { USER_CARDS } from '../constants';
import CardRecommendation from './CardRecommendation';
import MerchantChoice from './MerchantChoice';
import CardWallet from './CardWallet';

const PredictionSimulator: React.FC = () => {
  const [address, setAddress] = useState<string>('1 Infinite Loop, Cupertino, CA');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [merchantHint, setMerchantHint] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<MerchantPrediction | null>(null);
  const [userCards, setUserCards] = useState<Card[]>(USER_CARDS);

  const handleToggleCard = (cardId: string) => {
    setUserCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, isActive: !card.isActive } : card
      )
    );
  };

  const resetState = () => {
    setError(null);
    setPredictions(null);
    setSelectedPrediction(null);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (latitude || longitude) {
      setLatitude(null);
      setLongitude(null);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsFetchingLocation(true);
    resetState();
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);
        setAddress('Fetching address...');

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          if (!response.ok) throw new Error('Failed to fetch address');
          const data = await response.json();
          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
            throw new Error('No address found for location');
          }
        } catch (geoError) {
          console.error("Reverse geocoding error:", geoError);
          // Fallback to coordinates if address lookup fails
          setAddress(`Using location: ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
        } finally {
            setIsFetchingLocation(false);
        }
      },
      (err) => {
        setError(`Could not get location: ${err.message}. Please ensure location permissions are granted.`);
        setIsFetchingLocation(false);
      },
      { timeout: 10000 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetState();

    const activeCards = userCards.filter(c => c.isActive);
    if (activeCards.length === 0) {
      setError("Please select at least one card in your wallet.");
      setLoading(false);
      return;
    }

    if (!address && (!latitude || !longitude)) {
      setError("Please enter an address or use your current location.");
      setLoading(false);
      return;
    }

    const requestPayload: PredictionRequest = {
      merchantHint: merchantHint || undefined,
    };

    if (latitude && longitude) {
      requestPayload.latitude = latitude;
      requestPayload.longitude = longitude;
    } else {
      requestPayload.address = address;
    }

    try {
      const results = await predictMCC(requestPayload, activeCards);
      if (results && results.length > 0) {
        setPredictions(results);
        if (results.length === 1) {
          setSelectedPrediction(results[0]);
        }
      } else {
        setError("The GeoMCC Engine could not identify a merchant at this location.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };
  
  const ConfidenceBar = ({ value }: { value: number }) => {
    const percentage = Math.round(value * 100);
    const colorClass = percentage > 80 ? 'bg-green-500' : percentage > 60 ? 'bg-yellow-500' : 'bg-red-500';
    return (
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Transaction Simulator</h2>
      
      <CardWallet cards={userCards} onToggleCard={handleToggleCard} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-400">Street Address or Current Location</label>
          <div className="mt-1 flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              id="address" 
              value={address} 
              onChange={handleAddressChange} 
              required 
              placeholder="e.g., '1600 Amphitheatre Pkwy...'" 
              className="flex-grow w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            />
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isFetchingLocation || loading}
              className="flex-shrink-0 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
            >
              {isFetchingLocation ? (
                 <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              )}
              Use Location
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="merchantHint" className="block text-sm font-medium text-gray-400">Merchant Hint (optional)</label>
          <input type="text" id="merchantHint" value={merchantHint} onChange={(e) => setMerchantHint(e.target.value)} placeholder="e.g., 'gas station', 'Taco Bell'" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2" />
        </div>

        <div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : 'Predict Best Card'}
          </button>
        </div>
      </form>

      {error && <div className="mt-4 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md">{error}</div>}
      
      {predictions && predictions.length > 1 && !selectedPrediction && (
        <div className="mt-6 border-t border-gray-700 pt-6 animate-fade-in">
          <h3 className="text-lg font-bold text-white mb-2">Which merchant is it?</h3>
          <p className="text-sm text-gray-400 mb-4">We found a few possibilities for this location. Select one to see the recommendation.</p>
          <div className="flex flex-wrap gap-3">
            {predictions.map((p) => (
              <MerchantChoice 
                key={p.merchant_name}
                prediction={p}
                isSelected={selectedPrediction?.merchant_name === p.merchant_name}
                onSelect={() => setSelectedPrediction(p)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedPrediction && (
        <div className={`mt-6 ${predictions && predictions.length > 1 ? 'border-t border-gray-700 pt-6' : ''} animate-fade-in`}>
          <h3 className="text-lg font-bold text-white mb-4">Prediction Result</h3>
          <div className="bg-gray-700/50 p-4 rounded-lg space-y-4">
            <div>
                <p className="text-sm text-gray-400">Merchant</p>
                <p className="text-xl font-semibold capitalize">{selectedPrediction.merchant_name}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400">Predicted Category</p>
                <p className="text-xl font-semibold capitalize text-blue-300">{selectedPrediction.predicted_mcc_group}</p>
            </div>
             <div>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm text-gray-400">Confidence</p>
                    <p className="text-sm font-semibold text-white">{Math.round(selectedPrediction.confidence * 100)}%</p>
                </div>
                <ConfidenceBar value={selectedPrediction.confidence} />
            </div>
            <div>
                <p className="text-sm text-gray-400">Explanation</p>
                <p className="text-sm text-gray-300 italic">"{selectedPrediction.explanations.join(' ')}"</p>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mt-6 mb-4">Card Recommendations</h3>
          <div className="space-y-3">
            {selectedPrediction.recommended_card_ranking.map((rankedCard, index) => {
              const card = userCards.find(c => c.id === rankedCard.card_id);
              if (!card) return null;
              return <CardRecommendation key={card.id} card={card} rank={index + 1} rewardValue={rankedCard.expected_reward_value_cents_per_100_dollars} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionSimulator;