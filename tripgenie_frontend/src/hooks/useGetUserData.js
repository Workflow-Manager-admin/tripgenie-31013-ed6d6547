/**
 * ============================================================================
 *  Custom Hook: useGetUserData (TripMosaic)
 *  Handles Google OAuth login, user info retrieval, and dialog state for login.
 *  Modernized for clarity, PropTypes (N/A for hooks), and robustness.
 * ============================================================================
 */

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * useGetUserData provides login via Google, manages login modal, and navigation.
 * @returns {object} {openDialog, setOpenDailog, navigate, login}
 */
const useGetUserData = () => {
  // Track login/open dialog modal
  const [openDialog, setOpenDailog] = useState(false);

  // Navigation hook for route changes
  const navigate = useNavigate();

  /**
   * Retrieve user info from Google and store in localStorage.
   * @param {object} tokenInfo - Google OAuth credential object.
   */
  const getUserData = (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("No Google access token provided.");
      return;
    }
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
      })
      .catch((err) => {
        // Robust error logging for debugging
        console.error("Failed to fetch user info:", err);
      });
  };

  /**
   * Triggers Google OAuth login and invokes getUserData if successful.
   */
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserData(tokenResponse),
    onError: (err) => {
      console.error("Google login error:", err);
    },
  });

  // Expose login state, dialog handlers, and navigation for consumer components
  return { openDialog, setOpenDailog, navigate, login };
};

export default useGetUserData;