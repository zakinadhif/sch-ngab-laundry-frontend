import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import NavBar from "../components/NavBar";
import { useLoginMutation } from "../store/slices/apiSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      await login({
        username,
        password
      }).unwrap();

      navigate("/admin");
    } catch (err) {
      window.alert("Failed to login");
    }
  }

  return (
    <div className="text-slate-800 dark:text-white dark:bg-slate-900">
      <NavBar />
      <div className="flex min-h-screen pt-12">
        <div className="hidden md:flex justify-center items-center grow-[2] text-center">
          <p>Welcome to Ngab Laundry! <br /> Please login into your account.</p>
        </div>
        <div className="flex flex-col items-center justify-center grow-[1] border-l dark:border-slate-700">
          <form className="flex flex-col w-full max-w-xs gap-1" onSubmit={onSubmit}>
            <h1 className="mb-1 text-2xl font-bold">Login</h1>
            <label htmlFor="username-input" className="text-sm text-gray-500 dark:text-gray-400">
              Username
            </label>
            <input
              name="username"
              id="username-input"
              className="p-1 rounded-md ring-slate-500 ring-1 dark:bg-slate-500"
              type="text"
            />
            <label htmlFor="password-input" className="text-sm text-gray-500 dark:text-gray-400">
              Password
            </label>
            <input
              name="password"
              id="password-input"
              className="p-1 rounded-md ring-slate-500 ring-1 dark:bg-slate-500"
              type="password"
            />
            <input
              name="submit"
              id="submit"
              className="mt-2 text-lg text-white bg-purple-800 h-9 rounded-md"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
