// import axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react';

// export const userDataContext = createContext();

// const UserContext = ({children}) => {
//   const serverUrl = "http://localhost:8000";  
//   const [userData,setUserData]=useState(null)

//   const handleCurrentUser=async()=>{
//     try{
//       const result =await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
//       setUserData(result.data)
//       console.log(result.data)
//     }catch(error){
//       console.log(error)
//     }
//   }
//   useEffect(()=>{
//     handleCurrentUser()
//   },[])

//   const value = {
//     serverUrl,userData,setUserData
//   };

//   return (
//     <userDataContext.Provider value={value}>
//       {children}
//     </userDataContext.Provider>
//   );
// };

// export default UserContext;




// import axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react';

// export const userDataContext = createContext();

// const UserContext = ({ children }) => {
//   const serverUrl = "http://localhost:8000";  
//   const [userData, setUserData] = useState(null);
//   const [frontendImage,setFrontendImage]=useState(null)
//     const [backendImage,setBackendImage]=useState(null)
//     const [selectImage,setSelectImage]=useState(null)
//   const [loading, setLoading] = useState(true); // ✅ track loading state

//   const handleCurrentUser = async () => {
//     try {
//       const result = await axios.get(`${serverUrl}/api/user/current`, {
//         withCredentials: true
//       });
//       setUserData(result.data);
//     } catch (error) {
//       console.log("Current user fetch error:", error.response?.data || error.message);
//       setUserData(null); // ✅ ensure reset if not logged in
//     } finally {
//       setLoading(false); // ✅ stop loading
//     }
//   };

//   useEffect(() => {
//     handleCurrentUser();
//   }, []);

//   const value = {
//     serverUrl,
//     userData,
//     setUserData,
//     loading,
//     handleCurrentUser,
//     backendImage,setBackendImage,
//     frontendImage,setFrontendImage,
//     selectImage,setSelectImage
//   };

//   return (
//     <userDataContext.Provider value={value}>
//       {children}
//     </userDataContext.Provider>
//   );
// };

// export default UserContext;





import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:8000";  
  const [userData, setUserData] = useState(() => {
    // ✅ Load user from localStorage on refresh
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
        withCredentials: true,
      });
      setUserData(result.data);
      localStorage.setItem("userData", JSON.stringify(result.data)); // ✅ persist
    } catch (error) {
      console.log("Current user fetch error:", error.response?.data || error.message);
      setUserData(null);
      localStorage.removeItem("userData"); // ✅ clear if not logged in
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData: (data) => {
      setUserData(data);
      if (data) localStorage.setItem("userData", JSON.stringify(data));
      else localStorage.removeItem("userData");
    },
    loading,
    handleCurrentUser,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectImage,
    setSelectImage,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
