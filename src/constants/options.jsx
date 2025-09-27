// List of traveler group options
export const SelectTravelersList = [
  { id: 1, title: "Just Me", desc: "A solo traveler exploring the world", icon: "👤", people: "1" },
  { id: 2, title: "A Couple", desc: "Two travelers in tandem", icon: "👫", people: "2 People" },
  { id: 3, title: "Family", desc: "Traveling with kids and loved ones", icon: "👨‍👩‍👧‍👦", people: "3-5 People" },
  { id: 4, title: "Friends Group", desc: "Adventure with a close group of friends", icon: "🧑‍🤝‍🧑", people: "4-6 People" },
  { id: 5, title: "Large Family", desc: "Extended family trip full of memories", icon: "👩‍👩‍👧‍👦", people: "6-8 People" },
  { id: 6, title: "Corporate Team", desc: "Business trip or team retreat", icon: "💼", people: "5-10 People" },
  { id: 7, title: "Backpackers", desc: "Group of budget explorers", icon: "🎒", people: "2-5 People" },
  { id: 8, title: "Luxury Travelers", desc: "Premium comfort and relaxation seekers", icon: "✨", people: "2-4 People" },
  { id: 9, title: "Adventure Squad", desc: "Thrill-seekers ready for action", icon: "🏞️", people: "3-6 People" },
  { id: 10, title: "Senior Travelers", desc: "Easy-going journeys for retired explorers", icon: "🧓", people: "2-4 People" },
];

// List of budget options
export const SelectBudgetOptions = [
  { id: 1, title: "Cheap", desc: "Stay conscious of costs", icon: "💸" },
  { id: 2, title: "Moderate", desc: "Keep cost on the average side", icon: "💵" },
  { id: 3, title: "Luxury", desc: "Focus on comfort and premium experiences", icon: "💎" },
  { id: 4, title: "Flexible", desc: "Balance between saving and splurging", icon: "⚖️" },
];

// AI prompt template
export const AI_PROMPT = `
Generate a detailed travel plan for Location: {location}, for {totalDays} days, for {travelers} with a {budget} budget.

Instructions for AI:
1. Provide a "hotels" list with all of these fields:
   - hotelName
   - hotelAddress
   - price
   - hotelImages (array of image URLs)
   - geoCoordinates (latitude, longitude)
   - rating
   - description

2. Provide an "itinerary" object split by days: Day 1, Day 2, ..., Day {totalDays}. 
   Each day's places must include:
   - placeName
   - placeDetails
   - placeImageUrl
   - geoCoordinates (latitude, longitude)
   - ticketPricing
   - rating
   - timeToTravel
   - bestTimeToVisit

3. Return **strictly valid JSON only**, no extra text, comments, or explanations. Make sure no fields are missing.
`;
