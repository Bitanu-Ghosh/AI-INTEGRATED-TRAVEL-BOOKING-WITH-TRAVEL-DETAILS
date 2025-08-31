import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { DESTINATIONS } from "../data/destinations";
import { generateItinerary } from "./aihelper";
import useLocalStorage from "./useLocalStorage";

export default function DestinationDetails() {
  const { id } = useParams();
  const destination = DESTINATIONS.find(d => d.slug === id);
  const [days, setDays] = useState(destination?.days || 1);
  const [interest, setInterest] = useState("beach");
  const [plan, setPlan] = useState([]);
  const [trips, setTrips] = useLocalStorage("savedTrips", []);

  useEffect(() => {
    if (destination) {
      generateItinerary(destination.name, days, interest).then(setPlan);
    }
  }, [destination, days, interest]);

  if (!destination) return <p>Destination not found</p>;

  const handleSave = () => {
    const newTrip = {
      id: destination.slug,
      destination: destination.name,
      days,
      interest,
      plan,
    };
    setTrips([...trips, newTrip]);
    alert("Trip saved ✅ Check your Dashboard!");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{destination.name}</h1>
      <img src={destination.image} alt={destination.name} className="w-full h-64 object-cover rounded my-4" />
      <p className="text-amber-300">{destination.short}</p>

      <div className="mt-4 flex gap-4">
        <select value={days} onChange={e => setDays(Number(e.target.value))} className="border p-2 rounded">
          {[...Array(10)].map((_, i) => <option className="text-black" key={i} value={i+1}>{i+1} Days</option>)}
        </select>
        <select value={interest} onChange={e => setInterest(e.target.value)} className="border p-2 rounded">
          <option value="beach" className="text-black">Beach</option>
          <option value="adventure" className="text-black">Adventure</option>
          <option value="culture" className="text-black">Culture</option>
        </select>
      </div>

      <h2 className="mt-6 text-xl font-semibold">Itinerary</h2>
      <ul className="list-disc pl-6 mt-2">
        {plan.map((p, idx) => <li key={idx}>{p}</li>)}
      </ul>

      {plan.length > 0 && (
        <button onClick={handleSave} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
          Save Trip
        </button>
      )}
    </div>
  );
}
