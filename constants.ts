import { Card, MCCGroup } from './types';

export const USER_CARDS: Card[] = [
  {
    id: 'card-2',
    issuer: 'American Express',
    productName: 'Gold Card',
    network: 'Amex',
    rewardProfile: {
      baseRate: 1,
      rules: [
        { mccGroup: MCCGroup.Dining, multiplier: 4 },
        { mccGroup: MCCGroup.Grocery, multiplier: 4 },
      ],
    },
    imageUrl: 'https://raw.githubusercontent.com/jbk1998/CC-Rewards-Optimizer/main/icons/amex-gold.png',
    isActive: true,
  },
  {
    id: 'card-1',
    issuer: 'Chase',
    productName: 'Sapphire Reserve',
    network: 'Visa',
    rewardProfile: {
      baseRate: 1,
      rules: [
        { mccGroup: MCCGroup.Dining, multiplier: 3 },
        { mccGroup: MCCGroup.Travel, multiplier: 3 },
      ],
      merchantRules: [
        { merchantName: 'Lyft', multiplier: 5 }
      ]
    },
    imageUrl: 'https://raw.githubusercontent.com/jbk1998/CC-Rewards-Optimizer/main/icons/chase-sapphire-reserve.png',
    isActive: true,
  },
  {
    id: 'card-5',
    issuer: 'American Express',
    productName: 'Platinum Card',
    network: 'Amex',
    rewardProfile: {
      baseRate: 1,
      rules: [{ mccGroup: MCCGroup.Travel, multiplier: 5 }],
      merchantRules: [
        { merchantName: 'Lululemon', multiplier: 1, description: 'Offers a valuable statement credit, making it the top choice.' }
      ]
    },
    imageUrl: 'https://raw.githubusercontent.com/jbk1998/CC-Rewards-Optimizer/main/icons/amex-platinum.png',
    isActive: true,
  },
  {
    id: 'card-6',
    issuer: 'Bilt Rewards',
    productName: 'Bilt Mastercard',
    network: 'Mastercard',
    rewardProfile: {
        baseRate: 1,
        rules: [
            { mccGroup: MCCGroup.Dining, multiplier: 3 },
            { mccGroup: MCCGroup.Travel, multiplier: 2 },
        ],
    },
    imageUrl: 'https://raw.githubusercontent.com/jbk1998/CC-Rewards-Optimizer/main/icons/bilt-mastercard.png',
    isActive: true,
  },
  {
    id: 'card-4',
    issuer: 'Capital One',
    productName: 'Venture X',
    network: 'Visa',
    rewardProfile: {
      baseRate: 2,
      rules: [],
    },
    imageUrl: 'https://raw.githubusercontent.com/jbk1998/CC-Rewards-Optimizer/main/icons/capital-one-venture-x.png',
    isActive: true,
  },
  {
    id: 'card-7',
    issuer: 'Citi',
    productName: 'Custom Cash',
    network: 'Mastercard',
    rewardProfile: {
      baseRate: 1,
      rules: [
        { mccGroup: MCCGroup.Dining, multiplier: 5 },
        { mccGroup: MCCGroup.Gas, multiplier: 5 },
        { mccGroup: MCCGroup.Grocery, multiplier: 5 },
      ],
    },
    imageUrl: 'https://raw.githubusercontent.com/jbk1998/CC-Rewards-Optimizer/main/icons/citi-custom-cash.png',
    isActive: true,
  },
];

export const MOCK_METRICS_DATA = {
  accuracy: [
    { name: 'Dining', value: 94 },
    { name: 'Grocery', value: 91 },
    { name: 'Gas', value: 98 },
    { name: 'Travel', value: 88 },
    { name: 'Retail', value: 85 },
    { name: 'Other', value: 82 },
  ],
  rewardLift: [
    { name: 'Dining', value: 2.8 },
    { name: 'Grocery', value: 2.1 },
    { name: 'Travel', value: 3.5 },
    { name: 'Overall', value: 1.9 },
  ]
};
