import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { usePlacePhoto } from "../hooks/usePhotoURL";
import placeholder from '../assets/placeholder.jpg'
import { PiDownloadSimple } from "react-icons/pi";
import useGeneratePDF from "../hooks/useGeneratePDF";

/**
 * InfoSection Component
 * Shows the summary/hero for a given trip: cover photo, location, meta-data, export.
 * Allows PDF download via a dedicated "Export itinerary" button.
 */
// PUBLIC_INTERFACE
const InfoSection = ({ trip }) => {
  // Always call hooks at the top of the component
  const data = {
    textQuery: trip?.userSelection?.location?.label,
  };
  const photoURL = usePlacePhoto(trip, data);
  const { generatePdf } = useGeneratePDF();

  if (!trip || !trip.userSelection) return null;

  return (
    <div>
      {/* Trip Cover Image */}
      <img
        className="lg:h-[340px] h-[200px] w-full object-cover rounded-lg"
        src={photoURL ? photoURL : placeholder}
        alt={trip?.userSelection?.location?.label || ""}
      />

      {/* Trip Information and PDF Export */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3 py-6">
          <h2 className="text-2xl font-bold">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex lg:flex-row flex-col gap-4">
            <h2 className="bg-gray-200 lg:text-sm text-xs text-gray-500 px-3 py-1.5 rounded-full">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="bg-gray-200 lg:text-sm text-xs text-gray-500 px-3 py-1.5 rounded-full">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="bg-gray-200 lg:text-sm text-xs text-gray-500 px-3 py-1.5 rounded-full">
              🥂 No of Traveller: {trip?.userSelection?.noOfPeople} People
            </h2>
            <Button
              className="font-normal bg-gray-200 lg:text-sm text-xs text-gray-500 px-3 pb-.5 rounded-full  gap-3 hover:bg-black/30 hover:text-black/80"
              onClick={() => generatePdf(trip)}
              aria-label="Export itinerary as PDF"
            >
              Export itinerary <PiDownloadSimple />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Strict prop type validation for structure of trip object
InfoSection.propTypes = {
  trip: PropTypes.shape({
    userSelection: PropTypes.shape({
      location: PropTypes.shape({
        label: PropTypes.string,
      }),
      noOfDays: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      budget: PropTypes.string,
      noOfPeople: PropTypes.string,
    }),
  }),
};

export default InfoSection;
