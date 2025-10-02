// 
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const appContent = createContext();

export const AppProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // null instead of false for clarity

  // ✅ Fetch auth state on page load
  const getAuthState = async () => {
  try {
    const { data } = await axios.get(backendurl + "/api/auth/is-authenticated", {
      withCredentials: true,
    });

    if (data.success) {
      setIsLoggedIn(true);
      await getUserData();
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  } catch (error) {
    if (error.response?.status === 401) {
      // not logged in, do nothing
      setIsLoggedIn(false);
      setUserData(null);
    } else {
      toast.error(error.message);
    }
  }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  // ✅ Fetch user data (standardized name)
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/data", {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Call this immediately after login to update state
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUserData(user); // user = { userId, username, isAccountVerified, ... }
  };

  // ✅ Call this on logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  const value = {
    backendurl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,        // 👈 unified name
    handleLoginSuccess,
    handleLogout,
  };

  return <appContent.Provider value={value}>{props.children}</appContent.Provider>;
};

export default AppProvider;
