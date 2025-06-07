import { useState, useContext } from "react";
import {
  SELECT_TRAVEL_LIST,
  SELECT_BUDGET_OPTIONS,
  GENERATE_TRIP_PROMPT,
  CREATE_TRIP,
} from "../utils/constants";
import toast from "react-hot-toast";
import { chatSession } from "../services/AIModel";
import logo from "../assets/logo.jpg";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import ThemeContext from "../context/ThemeContext";
const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [locationInputValue, setLocationInputValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const { handleInputChanges, formData } = useForm();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserData(tokenResponse),
    onError: (error) => {
      console.error("Google login error:", error);
      toast.error("Failed to login with Google.");
    },
  });

  const generateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 10) {
      toast.error(CREATE_TRIP.noOfDaysError);
      return;
    }

    if (!formData?.location || !formData?.noOfDays || !formData?.noOfPeople || !formData?.budget) {
      toast.error(CREATE_TRIP.fillAllTheDeatilsError);
      return;
    }

    const locationFormatted = formData?.location?.properties?.formatted || "Unknown location";

    const finalPrompt = GENERATE_TRIP_PROMPT.replace("{location}", locationFormatted)
      .replace(CREATE_TRIP.noOfDays, formData.noOfDays)
      .replace(CREATE_TRIP.noOfPeople, formData.noOfPeople)
      .replace(CREATE_TRIP.budget, formData.budget);

    try {
      setLoading(true);
      const result = await chatSession.sendMessage(finalPrompt);
      setLoading(false);
      if (!result?.response?.text()) {
        toast.error("Failed to generate trip. Please try again.");
        return;
      }
      saveTrip(result.response.text());
    } catch (error) {
      setLoading(false);
      console.error("Error generating trip:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const getUserData = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(resp.data));
      setOpenDialog(false);
      generateTrip();
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch user data.");
    }
  };

  const saveTrip = async (tripData) => {
    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const parsedTripData = JSON.parse(tripData);
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId,
      });
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Failed to save trip:", error);
      toast.error("Failed to save trip data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-20 mb-20 px-6 lg:px-56 bg-white text-gray-900 dark:bg-[#0f0f0f] dark:text-white transition-colors duration-300">
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl font-bold text-orange-500">{CREATE_TRIP.title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">{CREATE_TRIP.titleDescription}</p>

        {/* Destination Selector */}
<div className="flex flex-col gap-10 mt-10">
  <div>
    <h3 className="text-xl my-3 font-semibold">{CREATE_TRIP.destinantionLabel}</h3>

    <div className="w-full">
  <GeoapifyContext apiKey="06f5c49b0a5045aa84e623035fe2a1a2">
    <GeoapifyGeocoderAutocomplete
      placeholder="Enter your destination"
      placeSelect={(value) => {
        setPlace(value);
        handleInputChanges("location", value);
        setLocationInputValue(value?.properties?.formatted || "");
      }}
      value={locationInputValue}
      className={`border border-gray-300 dark:border-gray-600 w-full p-2 bg-white dark:bg-[#1c1c1c] text-gray-900 dark:text-white rounded-md ${
        theme === "dark" ? "geoapify-autocomplete-dark" : ""
      }`}
    />
  </GeoapifyContext>
</div>

    {place?.properties?.formatted && (
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        📍 Selected: <span className="font-medium">{place.properties.formatted}</span>
      </p>
    )}
  </div>
</div>


        {/* Days Input */}
        <div>
          <h3 className="text-xl my-3 font-semibold">{CREATE_TRIP.timeLineLabel}</h3>
          <input
            onChange={(e) => handleInputChanges("noOfDays", Number(e.target.value))}
            value={formData?.noOfDays || ""}
            className="border border-gray-300 dark:border-gray-600 w-full p-2 bg-white dark:bg-transparent text-gray-900 dark:text-white rounded-md"
            placeholder="Ex. 3"
            type="number"
            min={1}
            max={10}
          />
        </div>

        {/* No of People */}
        <div>
          <h3 className="text-xl font-semibold">{CREATE_TRIP.noOfPeopleLabel}</h3>
          <div className="flex lg:flex-row flex-col gap-6 mt-6">
            {SELECT_TRAVEL_LIST.map((listItem) => (
              <div
                key={listItem.id}
                onClick={() => handleInputChanges("noOfPeople", listItem.people)}
                className={`flex flex-col gap-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1c1c1c] text-gray-900 dark:text-white rounded-md px-4 py-3 cursor-pointer hover:shadow-lg
                  ${
                    formData?.noOfPeople === listItem.people
                      ? "border-orange-500 scale-105 transition duration-100"
                      : ""
                  }`}
              >
                <h2 className="text-2xl">{listItem.icon}</h2>
                <h3 className="text-xl font-semibold">{listItem.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{listItem.desc}</p>
              </div>
            ))}
          </div>
        </div>   

        {/* Budget Options */}
        <div>
          <h3 className="text-xl font-semibold">{CREATE_TRIP.budgetLabel}</h3>
          <div className="flex lg:flex-row flex-col gap-6 mt-6">
            {SELECT_BUDGET_OPTIONS.map((listItem) => (
              <div
                key={listItem.id}
                onClick={() => handleInputChanges("budget", listItem.title)}
                className={`flex flex-col gap-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1c1c1c] text-gray-900 dark:text-white rounded-md px-4 py-3 cursor-pointer hover:shadow-lg
                  ${
                    formData?.budget === listItem.title
                      ? "border-orange-500 scale-105 transition duration-100"
                      : ""
                  }`}
              >
                <h2 className="text-2xl">{listItem.icon}</h2>
                <h3 className="text-xl font-semibold">{listItem.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{listItem.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plan My Trip Button */}
        <div className="flex justify-end mt-10">
          <Button
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:opacity-90 transition duration-200"
            onClick={generateTrip}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
            ) : (
              "Plan My Trip"
            )}
          </Button>
        </div>

        {/* Login Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img className="w-16 mx-auto" src={logo} alt="Logo" />
                <h2 className="font-bold text-lg mt-4 text-center">{CREATE_TRIP.signInLabel}</h2>
                <p className="mt-2 text-center">{CREATE_TRIP.signInDescription}</p>
                <Button
                  onClick={login}
                  className="flex font-bold items-center gap-4 w-full mt-4 justify-center"
                >
                  {CREATE_TRIP.signInButtonLabel}
                  <FcGoogle className="w-7 h-7" />
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateTrip;
