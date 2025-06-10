import PropTypes from "prop-types";
import { usePlacePhoto } from "../hooks/usePhotoURL";
import placeholder from "../assets/placeholder.jpg";
import { Link } from "react-router-dom";

/**
 * ============================================================================
 *  UserTripCard
 *  Displays a single saved trip as a clickable card with image, title, and info.
 *  Props:
 *    - trip: Trip object containing id, location, days, and budget info.
 *  Dependencies:
 *    - usePlacePhoto: hook for fetching dynamic place images via Google.
 * ============================================================================
 */
const UserTripCard = ({ trip }) => {
  const photoURL = usePlacePhoto(trip, {
    textQuery: trip?.userSelection?.location?.label,
  });

  // Skip rendering if trip is incomplete
  if (!trip?.userSelection) return null;

  const { location, noOfDays, budget } = trip.userSelection;
  const destination = location?.label || "Unknown Location";

  return (
    <Link
      to={`/view-trip/${trip.id}`}
      aria-label={`View trip to ${destination}`}
    >
      <div className="cursor-pointer transform hover:scale-[1.03] transition-transform duration-300 ease-in-out group max-w-[320px]">
        {/* Trip Image */}
        <div className="overflow-hidden rounded-xl shadow-lg">
          <img
            src={photoURL || placeholder}
            alt={destination}
            className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Trip Info */}
        <div className="mt-3 space-y-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
            {destination}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            📅 {noOfDays} day trip · 💰 Budget: {budget}
          </p>
        </div>
      </div>
    </Link>
  );
};

UserTripCard.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userSelection: PropTypes.shape({
      location: PropTypes.shape({
        label: PropTypes.string,
      }),
      noOfDays: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      budget: PropTypes.string,
    }),
  }).isRequired,
};

export default UserTripCard;
