import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext'

const Home = () => {
  const {userData}=useContext(userDataContext)
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#02023d] flex justify-center items-center flex-col relative'>
      <div className='w-[500px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl'>
    <img src={userData?.assistantImage} alt="" className='h-full object-cover '/>
      </div>
    </div>
  )
}

export default Home

