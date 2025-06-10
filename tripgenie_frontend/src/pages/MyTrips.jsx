import UserTripCard from "../components/UserTripCard";
import useMyTrip from "../hooks/useMyTrip";
import { FaThumbtack } from "react-icons/fa";

const MyTrips = () => {
  const { userTrips } = useMyTrip();

  return userTrips && (
    <div
      className="min-h-screen p-8 lg:px-40
                  relative text-orange-900 font-sans
                  bg-gradient-to-b from-orange-100 via-orange-50 to-orange-200"
      style={{
        backgroundImage:
          `url('https://www.transparenttextures.com/patterns/orange-cork.png')`,
        backgroundRepeat: "repeat",
      }}
    >
      <h2 className="text-5xl mb-12 font-extrabold text-orange-700 drop-shadow-md select-none tracking-wide">
        Your Travel Wall
      </h2>

      {userTrips.length === 0 ? (
        <p className="text-orange-600 italic text-lg mt-10 max-w-xl">
          No trips pinned yet. Start planning and watch your wall fill up!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {userTrips.map((trip, index) => (
            <div
              key={index}
              className={`relative bg-orange-50 rounded-lg shadow-xl p-6
                          transform transition-transform duration-300 hover:scale-105
                          border border-orange-400`}
              style={{
                rotate: `${(index % 3 - 1) * 2}deg`, // tilt effect -1,0,1 degrees
              }}
            >
              {/* Pin icon */}
              <FaThumbtack
                size={24}
                className="absolute -top-3 -left-3 text-orange-700 drop-shadow-lg"
                style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))" }}
              />

              {/* Decorative tape */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-orange-300 rounded-b-lg shadow-inner"
                style={{ filter: "brightness(0.85)" }}
              />

              {/* Trip Card */}
              <UserTripCard trip={trip} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
