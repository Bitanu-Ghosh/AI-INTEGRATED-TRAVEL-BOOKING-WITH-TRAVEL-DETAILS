import { Link } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

export default function Dashboard() {
  const [trips, setTrips] = useLocalStorage("savedTrips", []);

  // Function to delete a trip by its id
  const handleDelete = (id) => {
    const updatedTrips = trips.filter(trip => trip.id !== id);
    setTrips(updatedTrips);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Saved Trips</h1>

      {trips.length === 0 ? (
        <p className="text-gray-600">No trips saved yet.</p>
      ) : (
        <div className="space-y-4">
          {trips.map((trip, i) => (
            <div key={i} className="border p-4 rounded shadow flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div>
                <h2 className="text-xl font-semibold">{trip.destination}</h2>
                <p className="text-gray-500">{trip.days} days | Interest: {trip.interest}</p>
                <ul className="list-disc pl-6 mt-2">
                  {trip.plan.map((p, idx) => <li key={idx}>{p}</li>)}
                </ul>
              </div>

              <div className="flex gap-2 mt-3 md:mt-0">
                <Link
                  to={`/booking/${trip.id}`}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Book Now
                </Link>
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
