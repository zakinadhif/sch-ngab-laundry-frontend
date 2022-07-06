import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import OnlyAdmin from "./components/OnlyAdmin";
import Page404 from "./pages/Page404";

import AdminDashboard from "./pages/admin/Dashboard";
import MemberList from "./pages/admin/MemberList";
import TransactionList from "./pages/admin/TransactionList";
import PackageList from "./pages/admin/PackageList";
import UserList from "./pages/admin/UserList";

import { ThemeProvider } from "./contexts/Theme";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<OnlyAdmin />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/members" element={<MemberList />} />
              <Route path="/admin/packages" element={<PackageList />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/transactions" element={<TransactionList />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
