import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotels;

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))
        ) : (
          // Skeleton loaders (same style as MyTrips)
          [1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="h-[200px] w-full bg-slate-200 animate-pulse rounded-xl"
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Hotels
