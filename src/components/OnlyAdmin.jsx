import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {useEffect} from "react";

export default function OnlyAdmin() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const role = userData?.role;

  useEffect(() => {
    if (role !== "admin") {
      navigate("/login");
    }
  }, [userData]);

  return role === "admin" ? <Outlet /> : <p>Unauthorized access, please login as an admin first</p>
}
