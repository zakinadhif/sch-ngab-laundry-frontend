import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="fixed flex items-center justify-between w-full h-12 px-3 bg-white border-b">
      <ul className="flex items-center gap-2">
        <li><Link to="/" className="text-xl font-medium tracking-tight"><span className="font-bold text-purple-600">Ngab</span>Laundry</Link></li>
      </ul>
      <ul className="flex items-center gap-3">
        <li><Link to="/login" className="text-md">Login</Link></li>
        <li><Link to="/signup" className="px-2 py-1 text-lg text-white bg-purple-600 rounded-md">Sign Up</Link></li>
      </ul>
    </nav>
  );
}
