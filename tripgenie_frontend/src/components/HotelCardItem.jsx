import PropTypes from "prop-types";
import { usePlacePhoto } from "../hooks/usePhotoURL";
import { Link } from "react-router-dom";
import hotelPlaceholder from '../assets/hotel-3.jpg'

/**
 * HotelCardItem Component
 * Shows an individual hotel result, including photo and hotel meta-data.
 * Uses Google Places photo if available, falls back to local placeholder.
 */
// PUBLIC_INTERFACE
const HotelCardItem = ({ hotel }) => {
  // Always call hooks at the top of the component
  const data = {
    textQuery: hotel?.hotelName,
  };
  const photoURL = usePlacePhoto(hotel, data);

  if (!hotel) return null;

  // Build Google Maps search link for hotel name and address
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName ?? "")}, ${encodeURIComponent(hotel?.hotelAddress ?? "")}`;

  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      to={mapsUrl}
    >
      <div className="shadow-lg hover:scale-105 cursor-pointer transition-all duration-200 rounded-lg p-3 h-[330px]">
        {/* Hotel photo (with fallback) */}
        <img
          className="rounded-xl lg:h-[150px] lg:w-[200px] h-[120px] w-[180px] object-cover mx-auto"
          src={photoURL ? photoURL : hotelPlaceholder}
          alt={hotel?.hotelName || "Hotel"}
        />
        <div className="my-2 flex flex-col lg:gap-2 gap-3">
          <h2 className="font-medium mt-2 lg:text-lg text-sm">{hotel?.hotelName}</h2>
          <h2 className="text-gray-500 text-xs">📍 {hotel?.hotelAddress}</h2>
          <div className="flex lg:flex-row flex-col lg:gap-5 gap-3">
            <h2 className="lg:text-sm text-xs">💰 {hotel?.price}</h2>
            <h2 className="lg:text-sm text-xs">⭐ {hotel?.rating}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

HotelCardItem.propTypes = {
  hotel: PropTypes.shape({
    hotelName: PropTypes.string,
    hotelAddress: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default HotelCardItem;
