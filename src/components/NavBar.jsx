import { Link } from "react-router-dom";

export default function NavBar() {
  function toggleTheme() {
    if (localStorage.theme === "light") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (localStorage.theme === "dark") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  }

  return (
    <nav className="fixed flex items-center justify-between w-full h-12 px-3 border-b dark:border-slate-700">
      <ul className="flex items-center gap-3">
        <li>
          <Link to="/" className="text-xl font-medium tracking-tight">
            <span className="font-bold text-purple-600">Ngab</span>Laundry
          </Link>
        </li>
        <li>
          <button
            className="p-1 leading-none bg-gray-200 rounded-lg dark:bg-slate-600"
            onClick={toggleTheme}
          >
            🌙
          </button>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        <li>
          <Link to="/login" className="text-md">
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="px-2 py-1 text-lg text-white bg-purple-600 rounded-md"
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}
