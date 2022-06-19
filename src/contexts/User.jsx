import React, { useEffect, useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import { api } from "../config/api";

const UserContext = React.createContext();
const UserSetterContext = React.createContext();

export function useUserData() {
  return useContext(UserContext);
}

export function useUserJWTTokenSetter() {
  return useContext(UserSetterContext);
}

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState({
    token: null,
    data: null
  });

  useEffect(() => {
    if (userData?.token !== null) {
      api.defaults.headers.common['Authorization'] = "Bearer " + userData.token;
    }
  }, [userData]);

  function setUserJWTToken(token) {
    setUserData({
      token: token,
      data: jwt_decode(token)
    });
  }

  return (
    <UserContext.Provider value={userData}>
      <UserSetterContext.Provider value={setUserJWTToken}>
        { children }
      </UserSetterContext.Provider>
    </UserContext.Provider>
  );
}
