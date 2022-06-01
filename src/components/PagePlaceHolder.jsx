import NavBar from "../components/NavBar";

export default function PagePlaceHolder({ pageName }) {
  return (
    <div className="text-slate-800 dark:text-white dark:bg-slate-900">
      <NavBar />
      <div className="flex flex-col justify-center w-full max-w-3xl min-h-screen pt-12 mx-auto">
        <p className="text-2xl font-bold text-center">{pageName}</p>
      </div>
    </div>
  );
}
