import NavBar from "../components/NavBar";

export default function Login() {
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen pt-12">
        <div className="hidden md:flex justify-center items-center grow-[2]">
          <p>Welcome to Ngab Laundry</p>
        </div>
        <div className="border-l flex flex-col items-center justify-center grow-[1]">
          <form className="flex flex-col w-full max-w-xs gap-1">
            <h1 className="mb-1 text-2xl font-bold">Login</h1>
            <label htmlFor="username-input" className="text-sm text-gray-800">
              Username
            </label>
            <input
              name="username"
              id="username-input"
              className="p-1 rounded-md ring-slate-500 ring-1"
              type="text"
            />
            <label htmlFor="password-input" className="text-sm text-gray-800">
              Password
            </label>
            <input
              name="password"
              id="password-input"
              className="p-1 rounded-md ring-slate-500 ring-1"
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
    </>
  );
}
