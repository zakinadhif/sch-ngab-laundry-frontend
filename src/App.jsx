import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/Dashboard"
import MemberList from "./pages/admin/MemberList"
import TransactionList from "./pages/admin/TransactionList"
import PackageList from "./pages/admin/PackageList"
import UserList from "./pages/admin/UserList"
import {ThemeProvider} from "./contexts/Theme";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<MemberList />} />
          <Route path="/admin/packages" element={<PackageList />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/transactions" element={<TransactionList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
