import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../../config/service/GlobalApi";

function PlaceCardItem({ place }) {
  if (!place) return null;

  const [photoUrl ,setPhotoUrl] =useState();
  
    useEffect(()=>{
      place&& GetPlacePhoto();
    },[place])
  
    const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName
    };
    try {
      const resp = await GetPlaceDetails(data);
      // console.log(resp.data.places[0].photos[3].name);
  
      const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };
  

  return (
    
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
      target="_blank"
      className="w-full"
    >
        <p className="text-xs text-orange-400 mb-1">
                🌅 Best Time: {place.bestTimeToVisit}
              </p>
      <div className="border rounded-xl p-4 flex gap-4 hover:scale-105 transition-all hover:shadow-md cursor-pointer w-full ">
        <img
          src={photoUrl?photoUrl:"/placeholder.jpg"}
          alt={place.placeName || "Place Image"}
          className="w-[100px] h-[100px] rounded-xl object-cover"
        />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="font-bold text-lg">{place.placeName}</h2>
            <p className="text-sm text-gray-400 mb-1">{place.placeDetails}</p>

             {place.timeToTravel && (
              <span>⏳ Avg. Time: {place.timeToTravel}</span>
            )}
              {/* <p className="text-xs text-orange-400 mb-1">🕒 {place.timeToTravel}</p> */}
          </div>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
            <span>⭐ {place.rating}</span>
            <span>💲 {place.ticketPricing}</span>
            <Button size="sm">
              <FaMapLocationDot />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
