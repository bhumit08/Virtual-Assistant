import React, { useContext, useState } from "react";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Customize2 = () => {
  const navigate = useNavigate();
  const { userData, backendImage, selectImage, serverUrl, setUserData }=useContext(userDataContext);

  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || "" );
  const [state, setState] = useState(''); 

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

      if (backendImage) {
        formData.append("assistantImage",backendImage);
      } else{
        formData.append("imageUrl",selectImage);
      }

      const result = await axios.post(`${serverUrl}/api/user/update`, formData, {
  withCredentials:true,
  headers: { "Content-Type": "multipart/form-data" }
})

      setUserData(result.data);
      console.log(result.data)
      setMessage("Assistant updated successfully!");
      // navigate("/customize2")
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-[20px] relative">

      <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]'
      onClick={()=>navigate("/customize")}/>

      <h1 className="text-white text-[30px] text-center mb-[30px]">
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>

      <input type="text" placeholder="eg. Shifra" className="w-full max-w-[600px] h-[60px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-lg" required onChange={(e) => setAssistantName(e.target.value)} value={assistantName}/>

      {assistantName && (
        <button
          type="submit"
          disabled={loading}
          className={`min-w-[300px] h-[60px] mt-7 font-semibold rounded-full text-[19px] ${
            loading
              ? "bg-gray-400 text-black cursor-not-allowed"
              : "bg-white text-black"
          }`}
          onClick={()=>{        
            handleUpdateAssistant()
          }}
          
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
