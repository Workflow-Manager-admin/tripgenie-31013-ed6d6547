import UserTripCard from "../components/UserTripCard";
import useMyTrip from "../hooks/useMyTrip";

const MyTrips = () => {
  const { userTrips } = useMyTrip();

  return userTrips && (
    <div className="my-10 mb-20 px-6 lg:px-56 bg-[#0f0f0f] min-h-screen text-white">
      <h2 className="font-bold text-4xl text-orange-400">Your Trips</h2>

      {userTrips.length === 0 ? (
        <p className="text-gray-400 mt-10">No trips found. Start planning now!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {userTrips.map((trip, index) => (
            <UserTripCard key={index} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
