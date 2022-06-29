import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export function Card({ children, ...props }) {
  return (
    <div className="dark:bg-slate-800 bg-slate-300 shadow-md p-5 rounded-lg flex gap-3 items-center" {...props}>
      {children}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-slate-700 dark:text-white dark:bg-slate-900">
      <NavBar />
      <div className="grid justify-center content-center gap-3 grid-cols-2 w-full max-w-3xl min-h-screen pt-12 mx-auto">
        <h1 className="col-span-2 text-3xl font-bold">Home</h1>
        <Card onClick={() => navigate("admin/transactions")}>
          <i className="ri-arrow-up-down-line text-4xl"></i>
          <div>
            <h4 className="font-bold">Transaction</h4>
            <p className="text-sm">Register or modify a transaction</p>
          </div>
        </Card>
        <Card onClick={() => navigate("admin/members")}>
          <i className="ri-user-fill text-4xl"></i>
          <div>
            <h4 className="font-bold">Member</h4>
            <p className="text-sm">Register a new member</p>
          </div>
        </Card>
        <Card onClick={() => navigate("admin/packages")}>
          <i className="ri-shirt-fill text-4xl"></i>
          <div>
            <h4 className="font-bold">Packages</h4>
            <p className="text-sm">Look at existing laundry packages</p>
          </div>
        </Card>
        <Card onClick={() => navigate("admin")}>
          <i className="ri-file-chart-fill text-4xl"></i>
          <div>
            <h4 className="font-bold">Report</h4>
            <p className="text-sm">Display summary of transactions in this week</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
