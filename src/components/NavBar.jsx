import {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useThemeToggler } from "../contexts/Theme";
import { selectUser, logout } from "../store/slices/userSlice";

export default function NavBar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const toggleTheme = useThemeToggler();

  const [activeTab, setActiveTab] = useState("");

  return (
    <nav className="fixed flex items-center w-full h-12 px-3 border-b dark:border-slate-700">
      <ul className="flex items-center gap-3 dark:text-slate-300 text-slate-800 basis-0 grow">
        <li>
          <Link
            to="/"
            className="text-xl font-medium tracking-tight dark:text-slate-100 text-slate-900"
          >
            <span className="font-bold text-purple-600">Ngab</span>Laundry
          </Link>
        </li>
        <li>
          <button
            className="p-1 mr-3 leading-none bg-gray-200 rounded-lg dark:bg-slate-600"
            onClick={toggleTheme}
          >
            🌙
          </button>
        </li>
      </ul>
      <ul className="flex items-center justify-center gap-3 dark:text-slate-300 text-slate-800 grow basis-0">
        {user?.data?.role === "admin" && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/members">Members</Link>
            </li>
            <li>
              <Link to="/admin/packages">Packages</Link>
            </li>
            <li>
              <Link to="/admin/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/admin/users">Users</Link>
            </li>
          </>
        )}
        {user?.data?.role === "cashier" && (
          <li>
            <span>Cashier!</span>
          </li>
        )}
        {user.status === "logged_out" && (
          <li>
            <span>Not Logged In</span>
          </li>
        )}
      </ul>
      <ul className="flex items-center justify-end gap-3 basis-0 grow">
        {user.status === "logged_out" && (
          <>
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
          </>
        )}
        {user.status === "logged_in" && (
          <li>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
