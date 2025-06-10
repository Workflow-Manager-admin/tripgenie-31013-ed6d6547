/**
 * ============================================================================
 *  PlaceCard.jsx (TripMosaic Vistara) - Display Card for Itinerary Place
 *  Renders individual place details (name, description, ticket, time, image).
 *  Modernized for code quality: adds robust PropTypes, documentation, and defensive coding.
 * ============================================================================
 */

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { usePlacePhoto } from "../hooks/usePhotoURL";
import placeholder from "../assets/placeholder.jpg";

/**
 * PUBLIC_INTERFACE
 * PlaceCard: Displays a summary card for a single place in the itinerary.
 *
 * @param {object} place - Place info and metadata (placeName, placeDetails, etc.).
 */
const PlaceCard = ({ place }) => {
  // Compose the data query for usePlacePhoto (hook must run every render, before early returns)
  const data = {
    textQuery: place?.placeName,
  };
  const photoURL = usePlacePhoto(place, data);

  // Defensive: Don't render if place is not supplied
  if (!place) return null;

  // Build Google Maps search link for the place
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName ?? "")}`;

  return (
    <Link target="_blank" to={mapsUrl} rel="noopener noreferrer">
      <div className="grid grid-cols-12 my-2 py-6 px-5 gap-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-200">
        <div className="lg:col-span-8 col-span-7 flex flex-col gap-2">
          <h2 className="font-bold lg:text-lg text-sm">{place?.placeName}</h2>
          <p className="text-gray-500 lg:text-sm text-xs">{place?.placeDetails}</p>
          <p className="lg:text-sm text-xs">💵 {place?.ticketPricing}</p>
          <p className="lg:text-sm text-xs font-medium">🕙 {place?.timeTravel}</p>
        </div>
        <div className="lg:col-span-4 col-span-5 flex justify-between items-center">
          <img
            className="rounded-xl lg:h-[150px] w-[230px] h-[130px] object-cover"
            src={photoURL ? photoURL : placeholder}
            alt={place?.placeName || "Place Image"}
          />
        </div>
      </div>
    </Link>
  );
};

PlaceCard.propTypes = {
  /** Place object containing meta-data for an itinerary slot */
  place: PropTypes.shape({
    placeName: PropTypes.string,
    placeDetails: PropTypes.string,
    ticketPricing: PropTypes.string,
    timeTravel: PropTypes.string,
  }),
};

export default PlaceCard;
