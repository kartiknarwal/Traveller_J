import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  if (!trip?.tripData?.itinerary) {
    return <p className="text-gray-500 mt-5">Loading itinerary...</p>;
  }

  const itineraryArray = Object.entries(trip.tripData.itinerary).map(
    ([day, places]) => ({
      day,
      places: Array.isArray(places) ? places : [places], // ensure array
    })
  );

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-6">Places To Visit</h2>

      {itineraryArray.map((dayItem, dayIndex) => (
        <div key={dayIndex} className="mb-10">
          <h2 className="font-semibold text-lg text-gray-700 mb-3">
            {dayItem.day}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {dayItem.places.map((place, i) => (
              <PlaceCardItem key={i} place={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
