import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../../config/service/firebaseConfig";
import InfoSection from "./components/InfoSection.jsx";
import Hotels from "./components/Hotels.jsx";
import PlacesToVisit from "./components/PlacesToVisit.jsx";
import Footer from "./components/Footer.jsx";

function Index() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  // used to get trip info from firebase
  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AiTrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No Such Document");
        toast.error("No Trips Found with this ID!");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Failed to fetch trip!");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information section */}
      {trip ? <InfoSection trip={trip} /> : <p>Loading trip...</p>}

      {/* Recommended Hotels */}
      <Hotels trip={trip}/>
      {/* Daily Plan */}
      <PlacesToVisit trip={trip}/>

      {/* Footer */}
      <Footer trip={trip}/>
    </div>
  );
}

export default Index;
