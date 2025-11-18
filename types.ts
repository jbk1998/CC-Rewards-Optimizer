export enum MCCGroup {
  Dining = 'dining',
  Grocery = 'grocery',
  Gas = 'gas',
  Travel = 'travel',
  Retail = 'retail',
  Other = 'other',
}

export interface RewardRule {
  mccGroup: MCCGroup;
  multiplier: number;
}

export interface Card {
  id: string;
  issuer: string;
  productName: string;
  network: 'Visa' | 'Mastercard' | 'Amex';
  rewardProfile: {
    baseRate: number;
    rules: RewardRule[];
  };
  imageUrl?: string;
  isActive: boolean;
}

export interface PredictionRequest {
  address?: string;
  latitude?: number;
  longitude?: number;
  merchantHint?: string;
}

export interface RankedCard {
  card_id: string;
  expected_reward_value_cents_per_100_dollars: number;
}

export interface MerchantPrediction {
  predicted_mcc_group: MCCGroup;
  confidence: number;
  recommended_card_ranking: RankedCard[];
  explanations: string[];
  merchant_name: string;
}

export type PredictionResponse = MerchantPrediction[];