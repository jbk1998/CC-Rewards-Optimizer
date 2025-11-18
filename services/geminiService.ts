import { GoogleGenAI, Type } from "@google/genai";
import { PredictionRequest, PredictionResponse, Card, MerchantPrediction } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const predictionSchema = {
  type: Type.OBJECT,
  properties: {
    predicted_mcc_group: {
      type: Type.STRING,
      enum: ['dining', 'grocery', 'gas', 'travel', 'retail', 'other'],
      description: 'The most likely merchant category code group.'
    },
    confidence: {
      type: Type.NUMBER,
      description: 'The confidence score of the prediction, from 0.0 to 1.0.'
    },
    recommended_card_ranking: {
      type: Type.ARRAY,
      description: "A ranked list of the user's cards from best to worst for this transaction.",
      items: {
        type: Type.OBJECT,
        properties: {
          card_id: { type: Type.STRING, description: "The ID of the card." },
          expected_reward_value_cents_per_100_dollars: { type: Type.NUMBER, description: "Expected reward value in cents for a $100 transaction. Higher is better." }
        },
        required: ['card_id', 'expected_reward_value_cents_per_100_dollars']
      }
    },
    explanations: {
        type: Type.ARRAY,
        description: 'A brief, human-readable explanation for the prediction and ranking.',
        items: { type: Type.STRING }
    },
    merchant_name: {
      type: Type.STRING,
      description: "A plausible merchant name based on the location and hint. e.g. 'Starbucks', 'Shell Gas Station', 'Whole Foods Market'."
    }
  },
  required: ['predicted_mcc_group', 'confidence', 'recommended_card_ranking', 'explanations', 'merchant_name']
};

const responseSchema = {
    type: Type.ARRAY,
    description: "A list of up to 3 plausible merchant predictions for the given location.",
    items: predictionSchema
};


const generatePrompt = (request: PredictionRequest, cards: Card[]): string => {
  const cardDetails = cards.map(card => 
    `- Card ID: ${card.id} (${card.productName})\n` +
    `  - Base Rate: ${card.rewardProfile.baseRate}x points.\n` +
    `  - Bonus Categories: ${card.rewardProfile.rules.length > 0 ? card.rewardProfile.rules.map(r => `${r.mccGroup} at ${r.multiplier}x`).join(', ') : 'None'}`
  ).join('\n');

  const locationDetails = request.latitude && request.longitude
    ? `- Latitude: ${request.latitude}\n    - Longitude: ${request.longitude}`
    : `- Address: ${request.address}`;

  return `
    You are the GeoMCC Engine, a service that predicts a merchant's category (MCC) to recommend the best credit card for rewards.
    Assume 1 point = 1 cent for all reward calculations.

    A user is at the following location:
    ${locationDetails}
    ${request.merchantHint ? `- Merchant Hint: "${request.merchantHint}"` : ''}

    The user has these cards available:
    ${cardDetails}

    Your task is to:
    1.  Based on the location and hint, act as if you have access to map data to determine what kind of merchants could be there.
    2.  Identify up to 3 plausible, distinct merchants. If the location is very specific (e.g. '123 Main St, McDonald's'), just return one. If it is ambiguous (e.g. a large shopping center address), provide a few likely options (e.g., a coffee shop, a retail store, a restaurant).
    3.  For EACH plausible merchant you identify, perform a full analysis and create a JSON object with the following:
        a. A plausible, specific 'merchant_name'.
        b. The most likely 'predicted_mcc_group' from this list: [dining, grocery, gas, travel, retail, other].
        c. A 'confidence' score for this specific prediction.
        d. A 'recommended_card_ranking', calculating the expected reward value for each card and ranking them.
        e. A short, clear array of 'explanations' for your reasoning.

    Return the result as a JSON array, with each element being a complete prediction object matching the provided schema.
  `;
};

export const predictMCC = async (request: PredictionRequest, activeCards: Card[]): Promise<PredictionResponse> => {
  const prompt = generatePrompt(request, activeCards);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText) as MerchantPrediction[];

    // Validate and clamp confidence for each prediction
    parsedResponse.forEach(p => {
      p.confidence = Math.max(0, Math.min(1, p.confidence));
    });
    
    return parsedResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof SyntaxError) {
        throw new Error("Failed to parse the prediction response. The format may be invalid.");
    }
    throw new Error("Failed to get prediction from GeoMCC Engine.");
  }
};