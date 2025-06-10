/**
 * ============================================================================
 *  Generated/curated by Kavia AI: useViewTrip.js - Custom hook for reading a single trip
 *  Loads a specific trip's details from Firestore by trip ID in the route params.
 *  ESLint warnings removed (effect dependencies fixed and direct function in effect).
 * ============================================================================
 */

import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * Loads the trip data for a specified tripId (from route params),
 * returns { trip } (object or empty array if loading/error).
 */
const useViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    if (!tripId) return;
    /**
     * Loads a trip document from Firestore using tripId.
     * Notifies with toast if not found.
     */
    const getData = async () => {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
        toast("No Such Document");
      }
    };
    getData();
  }, [tripId]);

  return { trip };
};

export default useViewTrip;
