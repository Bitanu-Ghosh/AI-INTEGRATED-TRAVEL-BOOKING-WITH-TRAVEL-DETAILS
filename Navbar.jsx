import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-6">
      <Link to="/" className="hover:text-gray-300">Home</Link>
      <Link to="/destinations" className="hover:text-gray-300">Destinations</Link>
      <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
    </nav>
  );
}
