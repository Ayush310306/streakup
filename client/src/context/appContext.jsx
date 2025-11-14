// 
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const appContent = createContext();

export const AppProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/auth/is-authenticated",
        { withCredentials: true }
      );

      if (data.success) {
        setIsLoggedIn(true);
        await getUserData(); // always load normalized user
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  // 🔥 ALWAYS RETURN A NORMALIZED USER OBJECT
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/data", {
        withCredentials: true,
      });

      if (data.success) {
        const u = data.userData;

        // 🔥 normalize userId → always use "id"
        setUserData({
          id: u._id || u.id,    
          username: u.username,
          email: u.email,
          totalPoints: u.totalPoints,
          isAccountVerified: u.isAccountVerified,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // LOGIN SUCCESS FIX — backend sends { id: user._id }
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);

    // 🔥 normalize login result as well
    setUserData({
      id: user.id || user._id || user.userId,
      username: user.username,
      email: user.email,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <appContent.Provider
      value={{
        backendurl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        handleLoginSuccess,
        handleLogout,
      }}
    >
      {props.children}
    </appContent.Provider>
  );
};

export default AppProvider;
