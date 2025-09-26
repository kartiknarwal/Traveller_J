import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // use VITE_ prefix for Vite
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate a Travel Plan for Location: Las Vegas, for 3 Days for a Couple with a Cheap budget. 
          Include:
          - Hostels options list with hotelName, hotelAddress, price, hotelImages (array of URLs), geoCoordinates, rating, description
          - Suggested itinerary: placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, rating, timeToTravel, and bestTimeToVisit
          Return the result in JSON format only.`,
        },
      ],
    },
  ],
});

