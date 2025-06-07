/**
 * Kavia AI Documentation:
 * useGetUserData.js - Custom React hook for Google OAuth2 user sign-in and profile retrieval.
 * 
 * Purpose:
 * - Handles Google OAuth2 login with popup and retrieves user profile from Google.
 * - Stores user profile in localStorage for app-wide access.
 * - Provides dialog open state and navigation utilities for sign-in flows.
 *
 * Returns:
 *   - openDialog: boolean, dialog open state for UI
 *   - setOpenDailog: setter for dialog visibility
 *   - navigate: SPA router navigation function
 *   - login: function to initiate Google login
 */

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
const useGetUserData = () => {
    // State for whether the login dialog is open
    const [openDialog, setOpenDailog] = useState(false);

    const navigate = useNavigate();

    /**
     * Initiate Google sign-in flow; getUserData called on success with tokenResponse
     */
    const login = useGoogleLogin({
      onSuccess: (tokenResponse) => getUserData(tokenResponse),
      onError: (tokenResponse) => console.log(tokenResponse),
    });

    /**
     * Uses OAuth2 access token to get Google Profile; stores user in localStorage
     * @param {Object} tokenInfo - Google OAuth2 response
     */
    const getUserData = (tokenInfo) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokenInfo.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((resp) => {
          // Save Google profile for downstream use in the app
          localStorage.setItem("user", JSON.stringify(resp.data));
          setOpenDailog(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };

  // Expose UI and login functions to consumer components/pages
  return { openDialog, setOpenDailog, navigate, login }
}

export default useGetUserData