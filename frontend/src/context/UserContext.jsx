

import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const userDataContext = createContext();

const UserContext = ({children}) => {
  const serverUrl = "http://localhost:8000"

  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectImage, setSelectImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true, // Ensure cookies are sent
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if required
        },
      });
      setUserData(result.data);
      console.log(result.data)
      localStorage.setItem("userData", JSON.stringify(result.data));
    } catch (error) {
      console.log(error)
      setUserData(null);
      localStorage.removeItem("userData");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const updateUserData = (data) => {
    setUserData(data);
    if (data) {
      localStorage.setItem("userData", JSON.stringify(data));
    } else {
      localStorage.removeItem("userData");
    }
  };

  const value = {
    serverUrl,
    userData,
    setUserData: updateUserData, // Use the custom updateUserData function
    loading,
    handleCurrentUser,
    backendImage, setBackendImage,
    frontendImage, setFrontendImage,
    selectImage, setSelectImage
  };

  return (
    <div>
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
    </div>
  );
};

export default UserContext;

