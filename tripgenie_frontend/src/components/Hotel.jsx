import PropTypes from "prop-types";
import HotelCardItem from './HotelCardItem';

/**
 * Hotel Component
 * Renders a list/grid of recommended hotels for the given trip itinerary.
 * Expects a 'trip' object with a populated tripData.hotelOptions property.
 * Displays nothing if no trip data supplied.
 */
// PUBLIC_INTERFACE
const Hotel = ({ trip }) => {
  // Defensive: Don't render if trip or hotelOptions is absent/empty
  if (!trip || !Array.isArray(trip?.tripData?.hotelOptions) || trip.tripData.hotelOptions.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="font-bold text-xl my-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 gap-4">
        {/* Iterate over hotel options - one card per hotel */}
        {trip?.tripData?.hotelOptions.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

Hotel.propTypes = {
  /**
   * Trip object with tripData and hotelOptions array.
   * hotelOptions is expected to be an array for mapping.
   */
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      hotelOptions: PropTypes.arrayOf(
        PropTypes.shape({
          hotelName: PropTypes.string,
          hotelAddress: PropTypes.string,
          price: PropTypes.string,
          rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
      ),
    }),
  }),
};

export default Hotel;