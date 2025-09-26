import React, { useEffect, useState } from "react";
import GooglePlacesAutoComplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "../constants/options";
import { Button } from "../components/ui/button";
import { Toaster, toast } from "react-hot-toast";
import { chatSession } from "../config/service/AIModal.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "../config/service/firebaseConfig.jsx";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Index() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);


  const navigate =useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  // Google login handler
  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => fetchUserProfile(tokenInfo),
    onError: (error) => console.log("Login error:", error),
  });

  // Fetch user profile after Google login
  const fetchUserProfile = async (tokenInfo) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false);

      // Call GenerateTrip now that user is logged in
      OnGenerateTrip(true);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      toast("Failed to login, please try again.");
    }
  };

  // Generate Trip handler
  const OnGenerateTrip = async (skipLoginCheck = false) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user && !skipLoginCheck) {
      setOpenDialog(true); // show sign-in dialog
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.travellers) {
      toast("Please fill all the details to proceed.");
      return;
    }

    if (formData?.noOfDays > 8) {
      toast("Maximum 8 days allowed.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{travelers}", formData?.travellers)
      .replace("{budget}", formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const text = await result.response.text(); // ✅ Await the string
      console.log("AI Response:", text);

      await SaveAitrip(text); // ✅ Save only plain text
    } catch (err) {
      console.error("AI error:", err);
      toast("Something went wrong, try again.");
    }

    setLoading(false);
  };

  const SaveAitrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    // ✅ Normalize formData before saving
    const safeFormData = {
      location: formData?.location || "",
      budget: formData?.budget || "",
      travellers: formData?.travellers || "",
      noOfDays: formData?.noOfDays || "",
    };

    try {
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: safeFormData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });
    } catch (err) {
      console.error("Firestore save error:", err);
      toast("Failed to save trip. Please try again.");
    }
    setLoading(false);
    navigate('/view-trip/'+ docId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <Toaster />

      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences 🏕️🏖️🚵🌲
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Destination */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutoComplete
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v?.label);
              },
            }}
          />
        </div>

        {/* Trip Days */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      {/* Budget Options */}
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition ${
                formData?.budget === item.title ? "shadow-lg border-black" : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg mt-2">{item.title}</h2>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travelers Options */}
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on travelling with?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("travellers", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition ${
                formData.travellers === item.people
                  ? "shadow-lg border-black"
                  : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg mt-2">{item.title}</h2>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={() => OnGenerateTrip()}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      {/* Sign-In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in to the app securely using Google authentication.</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Index;
