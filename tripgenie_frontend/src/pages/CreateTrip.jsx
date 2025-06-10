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
    <div
      className={`min-h-screen py-12 px-6 flex justify-center items-center bg-gradient-to-tr from-orange-600 via-red-600 to-orange-700 transition-colors duration-500`}
    >
      {/* Ticket Container */}
      <div
        className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Left side - flight info and form */}
        <div className="p-10 flex flex-col justify-between bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <div>
            <img
              src={logo}
              alt="Logo"
              className="w-20 rounded-full mb-8 shadow-lg border-4 border-white"
            />
            <h1 className="text-5xl font-extrabold mb-2 tracking-tight leading-tight">
              {CREATE_TRIP.title}
            </h1>
            <p className="text-lg font-light opacity-90 mb-8 max-w-xs">
              {CREATE_TRIP.titleDescription}
            </p>

            {/* Destination Selector */}
            <label className="block mb-4 font-semibold text-lg">
              Destination
            </label>
            <GeoapifyContext apiKey="06f5c49b0a5045aa84e623035fe2a1a2">
              <GeoapifyGeocoderAutocomplete
                placeholder="Where are you headed?"
                placeSelect={(value) => {
                  setPlace(value);
                  handleInputChanges("location", value);
                  setLocationInputValue(value?.properties?.formatted || "");
                }}
                value={locationInputValue}
                className="w-full p-3 rounded-xl text-black border-2 border-white focus:outline-none focus:ring-4 focus:ring-orange-300 transition"
              />
            </GeoapifyContext>
            {place?.properties?.formatted && (
              <p className="mt-2 italic opacity-80">
                Selected:{" "}
                <span className="font-semibold">{place.properties.formatted}</span>
              </p>
            )}

            {/* Days Input */}
            <label className="block mt-6 mb-2 font-semibold text-lg">
              Trip Duration (Days)
            </label>
            <input
              onChange={(e) => handleInputChanges("noOfDays", Number(e.target.value))}
              value={formData?.noOfDays || ""}
              className="w-full p-3 rounded-xl text-black border-2 border-white focus:outline-none focus:ring-4 focus:ring-orange-300 transition"
              placeholder="Max 10 days"
              type="number"
              min={1}
              max={10}
            />
          </div>

          {/* Plan Button */}
          <div className="mt-10">
            <Button
              disabled={loading}
              onClick={generateTrip}
              className={`w-full py-4 rounded-full font-bold text-xl shadow-lg transition-transform duration-300 transform hover:scale-105 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-gray-700"
                  : "bg-white text-orange-600 hover:bg-orange-100"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Crafting Your Adventure...
                </div>
              ) : (
                "Plan My Epic Trip!"
              )}
            </Button>
          </div>
        </div>

        {/* Right side - Travelers and Budget cards */}
        <div className="p-10 bg-white">
          {/* Travelers */}
          <section>
            <h2 className="text-3xl font-bold text-orange-600 mb-6">
              Who Are You Traveling With?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SELECT_TRAVEL_LIST.map((listItem) => (
                <div
                  key={listItem.id}
                  onClick={() => handleInputChanges("noOfPeople", listItem.people)}
                  className={`cursor-pointer rounded-xl border-2 p-6 flex flex-col items-center justify-center text-center transition-shadow duration-300
                    ${
                      formData?.noOfPeople === listItem.people
                        ? "border-orange-500 shadow-lg scale-105"
                        : "border-gray-300 hover:border-orange-400 hover:shadow-md"
                    }
                  `}
                >
                  <span className="text-6xl mb-3">{listItem.icon}</span>
                  <h3 className="text-xl font-semibold text-orange-700">
                    {listItem.title}
                  </h3>
                  <p className="text-sm text-gray-600">{listItem.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Budget */}
          <section className="mt-12">
            <h2 className="text-3xl font-bold text-red-600 mb-6">
              What's Your Estimated Budget?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SELECT_BUDGET_OPTIONS.map((listItem) => (
                <div
                  key={listItem.id}
                  onClick={() => handleInputChanges("budget", listItem.title)}
                  className={`cursor-pointer rounded-xl border-2 p-6 flex flex-col items-center justify-center text-center transition-shadow duration-300
                    ${
                      formData?.budget === listItem.title
                        ? "border-red-500 shadow-lg scale-105"
                        : "border-gray-300 hover:border-red-400 hover:shadow-md"
                    }
                  `}
                >
                  <span className="text-6xl mb-3">{listItem.icon}</span>
                  <h3 className="text-xl font-semibold text-red-700">
                    {listItem.title}
                  </h3>
                  <p className="text-sm text-gray-600">{listItem.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Login Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="rounded-2xl p-8 max-w-md mx-auto shadow-2xl bg-white text-gray-900 transition-colors duration-300">
            <DialogHeader className="text-center">
              <img
                className="w-24 h-24 mx-auto mb-5 rounded-full shadow-md"
                src={logo}
                alt="Logo"
              />
              <h2 className="font-extrabold text-4xl text-orange-600 mb-3">
                {CREATE_TRIP.signInLabel}
              </h2>
              <DialogDescription className="text-lg text-gray-600 mb-8 leading-relaxed">
                {CREATE_TRIP.signInDescription}
              </DialogDescription>
              <Button
                onClick={login}
                className="flex items-center justify-center gap-4 w-full py-4 rounded-xl text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                <FcGoogle className="w-8 h-8" />
                {CREATE_TRIP.signInButtonLabel}
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateTrip;
