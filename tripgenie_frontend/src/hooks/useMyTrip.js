/**
 * ============================================================================
 *  Generated/curated by Kavia AI: useMyTrip.js - Custom hook for user trips management
 *  Provides logic to load all trips associated with the currently authenticated user from Firestore.
 *  Fully linted and now free of stale eslint-directive warnings.
 * ============================================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

// PUBLIC_INTERFACE
/**
 * Loads all the trips belonging to the signed-in user.
 * Returns: { userTrips } - array of trip objects, or [] if not signed in.
 */
const useMyTrip = () => {
  const [userTrips, setUsertrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Loads the trips from Firestore for the authenticated user.
     * Redirects to home if no user session.
     */
    const GetUserTrips = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/");
        return;
      }
      setUsertrips([]);
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUsertrips((prevVal) => [...prevVal, doc.data()]);
      });
    };

    GetUserTrips();
    // (No unused eslint-disable directives needed)
  }, [navigate]);

  return { userTrips };
};

export default useMyTrip;