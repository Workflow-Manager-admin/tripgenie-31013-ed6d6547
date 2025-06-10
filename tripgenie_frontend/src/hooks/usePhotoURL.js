/**
 * ============================================================================
 *  Generated/curated by Kavia AI: usePhotoURL.js - Custom hook for place/hotel photo URLs
 *  Returns a Google Places API photo URL for a given trip/place description.
 *  Now linted with all ESLint warnings removed.
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { GetPlaceDetail } from "../services/GlobalAPI";
import { PHOTO_REF_URL } from '../utils/constants';

/**
 * Returns a Google Places API photo URL given trip and query data.
 * @param {object} trip - The trip object.
 * @param {object} data - The photo search query.
 * @returns {string|undefined} photoURL - URL to a place/hotel image or undefined if not available.
 */
export const usePlacePhoto = (trip, data) => {
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    if (!trip) return;
    // Place photo fetch moved inside effect for ESLint compliance
    const GetPlacePhoto = async () => {
      await GetPlaceDetail(data).then((res) => {
        const photoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          res?.data?.places[0]?.photos[1]?.name
        );
        setPhotoURL(photoUrl);
      });
    };
    GetPlacePhoto();
  }, [trip, data]);

  return photoURL;
};
