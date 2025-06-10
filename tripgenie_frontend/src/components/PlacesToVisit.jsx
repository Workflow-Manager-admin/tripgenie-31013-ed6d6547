/**
 * ============================================================================
 *  PlacesToVisit.jsx (TripMosaic Vistara)
 *  Purpose: Renders day-wise places in the user's itinerary.
 *  Components: Uses <PlaceCard /> for each location block.
 * ============================================================================
 */

import PropTypes from "prop-types";
import PlaceCard from "./PlaceCard";

const PlacesToVisit = ({ trip }) => {
  const itinerary = trip?.tripData?.itinerary;

  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <p className="text-gray-500 text-center my-10">
        No itinerary data available.
      </p>
    );
  }

  return (
    <div className="my-10 space-y-6">
      <h2 className="font-bold text-2xl">🗺️ Places To Visit</h2>

      {itinerary.map((dayItem, dayIdx) => (
        <section key={dayIdx} className="space-y-4">
          {/* Day heading */}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Day {dayItem.day}
          </h3>

          {/* Places for the day */}
          <div className="grid md:grid-cols-2 gap-6">
            {dayItem.plan?.length > 0 ? (
              dayItem.plan.map((place, planIdx) => (
                <div key={planIdx} className="space-y-1">
                  {place?.time && (
                    <p className="text-sm text-indigo-500 font-medium">
                      🕒 {place.time}
                    </p>
                  )}
                  <PlaceCard place={place} />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No places added yet.</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

PlacesToVisit.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      itinerary: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.number.isRequired,
          plan: PropTypes.arrayOf(
            PropTypes.shape({
              placeName: PropTypes.string,
              placeDetails: PropTypes.string,
              ticketPricing: PropTypes.string,
              time: PropTypes.string,
              timeTravel: PropTypes.string,
            })
          ),
        })
      ),
    }),
  }).isRequired,
};

export default PlacesToVisit;
