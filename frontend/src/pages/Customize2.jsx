// import React, { useContext, useState } from "react";
// import { userDataContext } from "../context/userContext";
// import axios from "axios";

// const Customize2 = () => {
//   const { userData, backendImage, selectedImage, serverUrl, setUserData } =
//     useContext(userDataContext);
//   const [assistaneName, setAssistantName] = useState(
//     userData?.assistaneName || " "
//   );

//   const handleUpdateAssistant = async () => {
//     try {
//       let formData = new FormData();
//       formData.append("assistantName", assistaneName);
//       if (backendImage) {
//         formData.append("assistantImage", backendImage);
//       } else {
//         formData.append("imageUrl", selectedImage);
//       }
//       const result = await axios.post(
//         `${serverUrl}/api/user/update`,
//         formData,
//         { withCredentials: true }
//       );
//       console.log(result.data);
//       setUserData(result.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]">
//       <h1 className="text-white text-[30px] text-center mb-[30px]">
//         Enter Your <span className="text-blue-200">Assistant Name</span>
//       </h1>

//       <input
//         type="text"
//         placeholder="eg. shifra"
//         className="w-full max-w-[600px] h-[60px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-lg"
//         required
//         onChange={(e) => setAssistantName(e.target.value)}
//         value={assistaneName}
//       />
//       {assistaneName && (
//         <button
//           type="submit"
//           className="min-w-[300px] h-[60px] text-black mt-7 font-semibold bg-white rounded-full text-[19px]"
//           onClick={() => {
//             handleUpdateAssistant();
//           }}
//         >
//           finally Create Your Assistant
//         </button>
//       )}
//     </div>
//   );
// };

// export default Customize2;





// import React, { useContext, useState } from "react";
// import { userDataContext } from "../context/userContext";
// import axios from "axios";

// const Customize2 = () => {
//   const { userData, backendImage, selectedImage, serverUrl, setUserData } =
//     useContext(userDataContext);

//   const [assistantName, setAssistantName] = useState(
//     userData?.assistantName || ""
//   );

//   const handleUpdateAssistant = async () => {
//     try {
//       let formData = new FormData();
//       formData.append("assistantName", assistantName);

//       if (backendImage instanceof File) {
//         formData.append("assistantImage", backendImage);
//       } else if (selectedImage) {
//         formData.append("imageUrl", selectedImage);
//       }

//       const result = await axios.post(
//         `${serverUrl}/api/user/update`,
//         formData,
//         { withCredentials: true }
//       );

//       console.log(result.data);
//       setUserData(result.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]">
//       <h1 className="text-white text-[30px] text-center mb-[30px]">
//         Enter Your <span className="text-blue-200">Assistant Name</span>
//       </h1>

//       <input
//         type="text"
//         placeholder="eg. shifra"
//         className="w-full max-w-[600px] h-[60px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-lg"
//         required
//         onChange={(e) => setAssistantName(e.target.value)}
//         value={assistantName}
//       />

//       {assistantName && (
//         <button
//           type="submit"
//           className="min-w-[300px] h-[60px] text-black mt-7 font-semibold bg-white rounded-full text-[19px]"
//           onClick={handleUpdateAssistant}
//         >
//           Finally Create Your Assistant
//         </button>
//       )}
//     </div>
//   );
// };

// export default Customize2;




import React, { useContext, useState } from "react";
import { userDataContext } from "../context/userContext";
import axios from "axios";

const Customize2 = () => {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);

  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateAssistant = async () => {
    if (!assistantName.trim()) {
      setMessage("Assistant name is required!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      let formData = new FormData();
      formData.append("assistantName", assistantName);

      if (backendImage instanceof File) {
        formData.append("assistantImage", backendImage);
      } else if (selectedImage) {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );

      setUserData(result.data);
      setMessage("Assistant updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-[20px]">
      <h1 className="text-white text-[30px] text-center mb-[30px]">
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder="eg. Shifra"
        className="w-full max-w-[600px] h-[60px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-lg"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />

      {assistantName && (
        <button
          type="submit"
          disabled={loading}
          className={`min-w-[300px] h-[60px] mt-7 font-semibold rounded-full text-[19px] ${
            loading
              ? "bg-gray-400 text-black cursor-not-allowed"
              : "bg-white text-black"
          }`}
          onClick={handleUpdateAssistant}
        >
          {loading ? "Saving..." : "Finally Create Your Assistant"}
        </button>
      )}

      {message && (
        <p className="mt-5 text-lg text-center text-white">{message}</p>
      )}
    </div>
  );
};

export default Customize2;
