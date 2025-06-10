import InfoSection from "../components/InfoSection";
import Hotel from "../components/Hotel";
import PlacesToVisit from "../components/PlacesToVisit";
import useViewTrip from "../hooks/useViewTrip";
import { FaMapMarkedAlt, FaHotel, FaSuitcaseRolling } from "react-icons/fa";

const ViewTrip = () => {
  const { trip } = useViewTrip();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-400
                  py-20 px-6 md:px-16 lg:px-40 xl:px-60
                  relative overflow-hidden"
    >
      {/* Decorative blurred circles for depth */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-orange-300 rounded-full filter blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-96 h-96 bg-red-400 rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg tracking-wide">
            Your Customized Adventure Awaits
          </h1>
          <p className="mt-4 text-xl text-yellow-100 font-semibold leading-relaxed">
            Dive into your personalized itinerary, accommodations, and must-see places — crafted with care just for you.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <span className="inline-flex items-center gap-2 bg-yellow-200 bg-opacity-30 rounded-full px-5 py-2 text-yellow-900 font-semibold shadow-lg transform hover:scale-105 transition-transform cursor-default">
              <FaMapMarkedAlt className="w-6 h-6" />
              Explore Destinations
            </span>
            <span className="inline-flex items-center gap-2 bg-yellow-200 bg-opacity-30 rounded-full px-5 py-2 text-yellow-900 font-semibold shadow-lg transform hover:scale-105 transition-transform cursor-default">
              <FaHotel className="w-6 h-6" />
              Handpicked Hotels
            </span>
            <span className="inline-flex items-center gap-2 bg-yellow-200 bg-opacity-30 rounded-full px-5 py-2 text-yellow-900 font-semibold shadow-lg transform hover:scale-105 transition-transform cursor-default">
              <FaSuitcaseRolling className="w-6 h-6" />
              Must-Visit Spots
            </span>
          </div>
        </header>

        {/* Sections */}
        <section
          className="bg-white bg-opacity-90 rounded-3xl shadow-2xl border border-orange-400 p-12
                    hover:shadow-4xl transition-shadow duration-500"
        >
          <h2 className="text-3xl font-bold text-orange-600 mb-8 tracking-wide drop-shadow-sm">
            Trip Overview
          </h2>
          <InfoSection trip={trip} />
        </section>

        <section
          className="bg-white bg-opacity-90 rounded-3xl shadow-2xl border border-red-400 p-12
                    hover:shadow-4xl transition-shadow duration-500"
        >
          <h2 className="text-3xl font-bold text-red-600 mb-8 tracking-wide drop-shadow-sm">
            Your Hotel Stay
          </h2>
          <Hotel trip={trip} />
        </section>

        <section
          className="bg-white bg-opacity-90 rounded-3xl shadow-2xl border border-yellow-400 p-12
                    hover:shadow-4xl transition-shadow duration-500"
        >
          <h2 className="text-3xl font-bold text-yellow-600 mb-8 tracking-wide drop-shadow-sm">
            Places to Visit
          </h2>
          <PlacesToVisit trip={trip} />
        </section>
      </div>
    </div>
  );
};

export default ViewTrip;
