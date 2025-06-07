import { useState, useEffect } from "react";
import { GetPlaceDetail } from "../services/GlobalAPI";
import {PHOTO_REF_URL} from '../utils/constants'

export const usePlacePhoto = (trip,data) => {
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip, GetPlacePhoto]);

  const GetPlacePhoto = async () => {
    await GetPlaceDetail(data).then((res) => {
      const photosArr = res?.data?.places?.[0]?.photos;
      // Use first available photo or undefined if not present
      const photoRefObj = Array.isArray(photosArr) && photosArr.length > 0
        ? photosArr[0]
        : undefined;
      if (photoRefObj && photoRefObj.name) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRefObj.name);
        setPhotoURL(photoUrl);
      } else {
        setPhotoURL(undefined); // fallback: allows placeholder to show
      }
    }).catch(() => {
      setPhotoURL(undefined);
    });
  };

  return photoURL;
};
