import React, { useState, useContext } from "react";
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError]=useState("")
  const [loading,setLoading]=useState(false)  
  const { serverUrl,userData,setUserData} = useContext(userDataContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("")
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`, { name, email, password }, { withCredentials: true });
      console.log(result)
      setUserData(result.data)
      setLoading(false)
      navigate("/customize");

    } catch (error) {
      console.error("SignUp Error:", error.response?.data || error.message);
      setError(error.response.data.message)
          setLoading(false)

    }
  };

  return (
    <div className="w-full h-[100vh] bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${bg})` }}>

      <form className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]" onSubmit={handleSignUp}>

        <h1 className="text-white text-[30px] font-semibold mb-[30px]">Register to <span className="text-blue-400">Virtual Assistant</span></h1>

        <input type="text" placeholder="Enter your Name" className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 text-[18px] px-[20px] rounded-full" required onChange={(e) => setName(e.target.value)} value={name} />

        <input type="email" placeholder="Email" className="w-full h-[55px] outline-none border border-white bg-transparent text-white placeholder-gray-300 text-[18px] px-5 rounded-full text-lg" required onChange={(e) => setEmail(e.target.value)} value={email} />

        <div className="relative w-full">
          <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full h-[55px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-lg" required onChange={(e) => setPassword(e.target.value)} value={password} />

          {!showPassword && <IoEye className="absolute top-1/2 right-[15px] -translate-y-1/2 h-[25px] w-[25px] text-white cursor-pointer" onClick={() => setShowPassword(true)} />}

          {showPassword && <IoEyeOff className="absolute top-1/2 right-[15px] -translate-y-1/2 h-[25px] w-[25px] text-white cursor-pointer" onClick={() => setShowPassword(false)} />}
        </div>

        {error.length>0 && <p className="text-red-500 text-[17px]">
          {error}
          </p>}

        <button type="submit" className="min-w-[150px] h-[60px] text-black mt-7 font-semibold bg-white rounded-full text-[19px]" disabled={loading}>{loading?"Loading...":"Sign Up"}</button>

        <p className="text-white text-[18px] cursor-pointer" onClick={() => navigate("/signin")}>Already have an account? <span className="text-blue-400">Sign In</span></p>

      </form>
    </div>
  );
};

export default SignUp;