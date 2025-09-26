import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { IoIosSend } from 'react-icons/io'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../../config/service/GlobalApi'

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (trip) {
      GetPlacePhoto()
    }
  }, [trip])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location,
    }
    try {
      const resp = await GetPlaceDetails(data)
      const url = PHOTO_REF_URL.replace(
        '{NAME}',
        resp.data.places[0].photos[3].name
      )
      setPhotoUrl(url)
    } catch (error) {
      console.error('Error fetching place photo:', error)
    } finally {
      setLoading(false)
    }
  }

 

  return (
    <div>
      {/* Image Section with skeleton */}
      {loading ? (
        <div className="h-[360px] w-full bg-slate-200 animate-pulse rounded-xl" />
      ) : (
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          alt="image"
          className="h-[360px] w-full object-cover rounded-xl"
        />
      )}

      {/* Info Section with skeleton */}
      <div className="flex justify-between items-center">
        {loading ? (
          <div className="w-full flex flex-col gap-3 mt-5">
            <div className="h-6 w-1/3 bg-slate-200 animate-pulse rounded" />
            <div className="flex gap-3">
              <div className="h-6 w-20 bg-slate-200 animate-pulse rounded-full" />
              <div className="h-6 w-20 bg-slate-200 animate-pulse rounded-full" />
              <div className="h-6 w-32 bg-slate-200 animate-pulse rounded-full" />
            </div>
          </div>
        ) : (
          <div className="my-5 flex flex-col gap-2">
            <h2 className="font-bold text-2xl">
              🗺️📍{trip?.userSelection?.location}
            </h2>
            <div className="flex gap-5">
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-sm md:text-md">
                📅{trip?.userSelection?.noOfDays} Day
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-sm md:text-md">
                💰{trip?.userSelection?.budget} Budget
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-sm md:text-md">
                🥂No.Of Traveller: {trip?.userSelection?.travellers}
              </h2>
            </div>
          </div>
        )}

        {!loading && (
          <Button>
            <IoIosSend />
          </Button>
        )}
      </div>
    </div>
  )
}

export default InfoSection
