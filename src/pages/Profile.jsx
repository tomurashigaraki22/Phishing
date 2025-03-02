import React, { useEffect, useState } from "react";
import { FaCog, FaHome, FaLink, FaUser, FaWallet } from "react-icons/fa";
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

const ProfileSettings = () => {
  const [email, setEmail] = useState("...")
  

  useEffect(() => {
    const getDeets = async () => {
      try {
        const token = localStorage.getItem("token")
        const decodedToken = jwt_decode(token)
        console.log("Decoded: ", decodedToken)
        const email = decodedToken.email
        setEmail(email)
      } catch (error) {
        console.error("Error: ", error)
      }
    }

    getDeets()
  }, [])


  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex flex-col items-center py-10 font-livvic">
      <h1 className="text-3xl font-bold text-[#8B5CF6]">Profile Settings</h1>
      <p className="text-gray-400 md:text-left text-center">Manage your account settings and preferences</p>
      
      <div className="bg-[#161B22] p-6 rounded-lg shadow-lg w-[90%] md:w-[60%]` max-w-xl mt-6">
        <div className="border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <span className="mr-2">👤</span> Profile Information
          </h2>
          <label className="block text-gray-400 mt-2">Email Address</label>
          <input
            type="email"
            className="w-full bg-[#0D1117] text-white p-2 mt-1 rounded border border-gray-600 focus:border-[#8B5CF6] outline-none"
            value={email}
            disabled
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold flex items-center">
            <span className="mr-2">🔑</span> Change Password
          </h2>
          <label className="block text-gray-400 mt-2">Current Password</label>
          <input
            type="password"
            className="w-full bg-[#0D1117] text-white p-2 mt-1 rounded border border-gray-600 focus:border-[#8B5CF6] outline-none"
          />
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 p-4 flex justify-around text-center sm:text-left">
        <Link to="/dashboard" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaHome className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Home</span>
        </Link>
        <Link to="/links" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaLink className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Links</span>
        </Link>
        <Link to="/credits" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaWallet className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Credits</span>
        </Link>
        <Link to="/profile" className="hover:text-blue-400 flex items-center sm:flex-col text-blue-600">
          <FaUser className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Profile</span>
        </Link>
        <Link to="/settings" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaCog className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Settings</span>
        </Link>
      </footer>
    </div>
  );
};

export default ProfileSettings;
