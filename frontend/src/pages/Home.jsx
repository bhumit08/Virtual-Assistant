
// // ✅ Utility to ensure voices are loaded before use
// const loadVoices = () => {
//   return new Promise((resolve) => {
//     let voices = window.speechSynthesis.getVoices();
//     if (voices.length !== 0) {
//       resolve(voices);
//     } else {
//       window.speechSynthesis.onvoiceschanged = () => {
//         voices = window.speechSynthesis.getVoices();
//         resolve(voices);
//       };
//     }
//   });
// };


// import React, { useContext, useEffect } from 'react'
// import { userDataContext } from '../context/userContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'


// const Home = () => {
//   const {userData,serverUrl,setUserData,getGeminiResponse}=useContext(userDataContext)
//   const navigate=useNavigate()

//   const handleLogOut=async()=>{
//       try{
//         const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
//         setUserData(null)
//         navigate("/signin")

//       }catch(error){
//         setUserData(null)
//         console.log(error)
//       }
//   }


//   const speak = async (text) => {
//   if (!text) return;

//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "en-US";
//   utterance.rate = 1;
//   utterance.pitch = 1;

//   const voices = await loadVoices();
//   utterance.voice = voices.find(v => v.lang === "en-US") || voices[0];

//   console.log("Speaking:", text);
//   window.speechSynthesis.cancel();
//   window.speechSynthesis.speak(utterance);
// };


//   // const speak=(text)=>{
//   //   const utterence=new SpeechSynthesisUtterance(text)
//   //   window.speechSynthesis.speak(utterence)
//   // }

// //   const speak = (text) => {
// //   if (!text) return;

// //   const utterance = new SpeechSynthesisUtterance(text);
// //   utterance.lang = "en-US";
// //   utterance.rate = 1;   // speaking speed
// //   utterance.pitch = 1;  // voice pitch

// //   // stop ongoing speech before starting new
// //   window.speechSynthesis.cancel();
// //   window.speechSynthesis.speak(utterance);
// // };


// useEffect(() => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//   if (!SpeechRecognition) {
//     console.log("SpeechRecognition API is not supported in this browser");
//     return;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.continuous = true;
//   recognition.lang = "en-US";

//   // recognition.onresult = async (event) => {
//   //   const transcript = event.results[event.results.length - 1][0].transcript.trim();
//   //   console.log("heard:", transcript);

//   //   if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
//   //     const data = await getGeminiResponse(transcript);
//   //     console.log(data);
//   //     speak(data.response);
//   //   }
//   // };


//   recognition.onresult = async (event) => {
//   const transcript = event.results[event.results.length - 1][0].transcript.trim();
//   console.log("heard:", transcript);

//   if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
//     const data = await getGeminiResponse(transcript);
//     console.log("Assistant response:", data);

//     if (data && data.response) {
//       speak(data.response);  // now guaranteed to speak
//     } else {
//       console.warn("No response text to speak");
//     }
//   }
// };


//   recognition.start();

//   return () => recognition.stop();
// }, []);

//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#02023d] flex justify-center items-center flex-col gap-[15px]'>

// <button type="submit" className="min-w-[150px] h-[60px] text-black mt-7 font-semibold cursor-pointer bg-white absolute top-[20px] right-[20px]  rounded-full text-[19px]" onClick={handleLogOut}>Log Out</button>

// <button type="submit" className="min-w-[150px] h-[60px] text-black mt-7 font-semibold cursor-pointer bg-white absolute top-[100px] right-[20px] px-[20px] py-[10px] rounded-full text-[19px]" onClick={()=>navigate("/customize")}>Customize Your Assistant</button>

//       <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-4xl shadow-lg'>

//     <img src={userData?.assistantImage} alt="" className='h-full object-cover '/>
//       </div>
//       <h1 className='text-white text-[18px] font-semibold'>I'm {userData.assistantName}</h1>
//     </div>
//   )
// }

// export default Home





import React, { useContext, useEffect, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";

const loadVoices = () => {
  return new Promise((resolve) => {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length !== 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };
    }
  });
};

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);
  const navigate = useNavigate();

  const [activated, setActivated] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [ham, setHam] = useState(false);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  // ✅ Speak function
  const speak = async (text) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const voices = await loadVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN"; // good for English + Hinglish
    utterance.rate = 1;
    utterance.pitch = 1;

    const englishVoice =
      voices.find((v) => v.lang.startsWith("en")) || voices[0];
    if (englishVoice) utterance.voice = englishVoice;

    window.speechSynthesis.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type === "google-search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
    if (type === "calculator-open") {
      window.open(`https://www.google.com/search?q=calculator`, "_blank");
    }
    if (type === "instagram-open") {
      window.open(`https://www.instagram.com/`, "_blank");
    }
    if (type === "facebook-open") {
      window.open(`https://www.facebook.com/`, "_blank");
    }
    if (type === "weather-show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    }
    if (type === "youtube-search" || type === "youtube_play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }
  };

  useEffect(() => {
    // const greeting = new SpeechSynthesisUtterance(
    //   `Hello ${userData.name}, what can I help you with?`
    // );
    // greeting.lang = "en-IN";
    // window.speechSynthesis.speak(greeting);

    if (!activated) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.log("SpeechRecognition API is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-IN";

    recognition.onresult = async (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      console.log("heard:", transcript);

      if (
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        setAiText(" ");
        setUserText(transcript);
        const data = await getGeminiResponse(transcript);
        console.log("Assistant response:", data);
        handleCommand(data);
        setAiText(data.response);
        setUserText("");
      }
    };

    recognition.start();
    return () => recognition.stop();
  }, [activated]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-t from-black to-[#02023d] flex flex-col items-center justify-center px-4 relative">
      {!activated ? (
        <button
          onClick={() => setActivated(true)}
          className="px-8 py-3 bg-green-400 text-black font-semibold rounded-full text-lg shadow-md hover:bg-green-500 transition"
        >
          Start Assistant
        </button>
      ) : (
        <>
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden text-white absolute top-6 right-6 w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"
            onClick={() => setHam(true)}
          >
            <CgMenuRight className="w-6 h-6" />
          </button>

          <div
            className={`fixed inset-0 z-40 transition ${
              ham ? "pointer-events-auto" : "pointer-events-none"
            }`}
            aria-hidden={!ham}
          >
            <div
              className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
                ham ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setHam(false)}
            />
            <aside
              className={`absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-[#0a0a2a] p-6 flex flex-col gap-6 transform transition-transform duration-300 ${
                ham ? "translate-x-0" : "translate-x-full"
              }`}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-white text-xl font-bold">Menu</h2>
                <button
                  aria-label="Close menu"
                  className="text-white w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"
                  onClick={() => setHam(false)}
                >
                  <RxCross1 className="w-5 h-5" />
                </button>
              </div>

              <button
                className="w-full py-3 bg-white rounded-full text-lg font-semibold text-black hover:bg-gray-200 transition"
                onClick={handleLogOut}
              >
                Log Out
              </button>

              <button
                className="w-full py-3 bg-white rounded-full text-lg font-semibold text-black hover:bg-gray-200 transition"
                onClick={() => {
                  setHam(false);
                  navigate("/customize");
                }}
              >
                Customize Assistant
              </button>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-white text-lg font-semibold mb-3">🕒 History</h3>
                <div className="w-full h-64 overflow-y-auto flex flex-col gap-2 pr-1">
                  {userData.history?.length ? (
                    userData.history.map((his, index) => (
                      <span
                        key={index}
                        className="text-gray-300 text-sm truncate bg-[#1a1a40] px-3 py-2 rounded"
                        title={his}
                      >
                        {his}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No history yet.
                    </span>
                  )}
                </div>
              </div>
            </aside>
          </div>

          <div className="hidden lg:flex gap-3 absolute top-6 right-6">
            <button
              className="px-6 py-2 bg-white rounded-full text-base font-semibold text-black hover:bg-gray-200 transition"
              onClick={handleLogOut}
            >
              Log Out
            </button>
            <button
              className="px-6 py-2 bg-white rounded-full text-base font-semibold text-black hover:bg-gray-200 transition"
              onClick={() => navigate("/customize")}
            >
              Customize Assistant
            </button>
          </div>

          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex justify-center">
            <div className="w-72 h-96 sm:w-80 sm:h-[28rem] flex justify-center items-center overflow-hidden rounded-3xl shadow-lg border border-white/10 bg-[#101045]">
              <img
                src={userData?.assistantImage}
                alt="Assistant"
                className="h-full w-full object-cover"
                draggable="false"
              />
            </div>
          </div>

          <h1 className="text-white text-lg sm:text-xl font-semibold mt-4 text-center">
            I’m <span className="text-green-400">{userData.assistantName}</span>
          </h1>
          <div className="mt-6">
            {!aiText ? (
              <img src={userImg} alt="Listening" className="w-32 sm:w-40" />
            ) : (
              <img src={aiImg} alt="Speaking" className="w-32 sm:w-40" />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
