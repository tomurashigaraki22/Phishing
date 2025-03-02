import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaLink, FaWallet, FaUser, FaCog, FaTelegram, FaBook, FaBell, FaPlus, FaKey } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import jwt_decode from 'jwt-decode'
import { BASE_URL } from '../../config';
import { GiCheckMark } from 'react-icons/gi';

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate()
  const [username, setUsername] = useState("Operator")
  const {logout} = useAuth()
  const [loadingChat, setloadingChat] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatId, setChatId] = useState("");

  const logoutNow = async () => {
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.log("Error: ", error)
      alert("Error: ", error)
    }
  }

  const saveChatId = async (chatId) => {
    setloadingChat(true)
    try {
      const token = localStorage.getItem("token")
      const decodedToken = jwt_decode(token)
      const { user_id } = decodedToken
      const response = await fetch(`${BASE_URL}/save_chat_id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_id: chatId, user_id: user_id }),
      });
      console.log("REsponse: ", response)
  
      const data = await response.json();
      console.log("Data; ", data)
  
      if (response.ok) {
        localStorage.setItem("chatId", chatId);
        alert("Chat ID saved successfully!");
        console.log(data.message);
      } else {
        alert(`Error: ${data.error}`);
        console.error("Failed to save chat ID:", data.error);
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setloadingChat(false);
    }
  };
  

  const getBalance = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage");
            return;
        }

        const decodedToken = jwt_decode(token);
        const { email, user_id } = decodedToken;
        const u = localStorage.getItem("username")
        console.log("U: ", u)
        setUsername(u)

        const response = await fetch(`${BASE_URL}/get_balance`, {
            method: "POST",
            body: JSON.stringify({ user_id }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to fetch balance:", errorData.error);
            return;
        }

        const data = await response.json();
        console.log("Balance data:", data);
        localStorage.setItem("balance", data.balance)
        setBalance(data.balance)

        return data;
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
};


useEffect(() => {
  const main = async () => {
    try {
      await getBalance()
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  main()
}, [])

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-gray-300 font-livvic p-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center border-b border-gray-700 p-4 bg-gray-800 shadow-md rounded-md">
        <h1 className="text-2xl font-bold tracking-wide text-blue-400">CyberOps</h1>
        <div className="flex flex-col space-y-4">
          <button onClick={() => navigate("/buycredits")} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-500 transition-all duration-200 border border-blue-500 space-x-3">
            <FaWallet className="sm:mr-0 sm:text-xl" /> <span className="hidden sm:block text-white">Buy Credits</span>
          </button>
          <button onClick={logoutNow} className="lg:w-40 w-12 bg-red-700 text-black space-x-3 px-4 py-2 rounded flex items-center justify-center hover:bg-red-600 transition-all text-white duration-200 border border-red-500">
            <FaKey className="sm:mr-0 sm:text-xl" /> <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </nav>
      
      {/* Welcome & Alert */}
      <div className="p-4 border border-yellow-500 bg-yellow-900 bg-opacity-20 rounded-md my-4 shadow-md">
        <p className="text-yellow-300 font-semibold">⚠️ Important Update</p>
        <p>Stay updated with the latest security tools and tactics.</p>
      </div>
      
      <h2 className="text-xl font-semibold text-blue-400">Welcome back, {username}</h2>

      {/* Required Actions */}
      <div className="mt-6">
        <h3 className="text-lg font-medium underline text-gray-400">Required Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <button disabled={localStorage.getItem('chatId') !== null} onClick={() => setIsModalOpen(true)} className={localStorage.getItem("chatId") !== null ? "border border-gray-500 p-4 rounded bg-gray-800 flex items-center hover:bg-gray-900 transition-all duration-200 text-gray-600" : "cursor-pointer border border-gray-500 p-4 rounded bg-gray-800 flex items-center hover:bg-gray-700 transition-all duration-200"}>
            {localStorage.getItem("chatId") == null ? (<FaTelegram className="mr-2" />) : (<GiCheckMark className='mr-2 text-gray-600' />)} Connect Telegram Bot
          </button>
          <div className="border border-green-500 p-4 rounded bg-gray-800 flex items-center hover:bg-green-900 transition-all duration-200">
            <FaBook className="mr-2" /> Tutorials
          </div>
          <div className="border border-yellow-500 p-4 rounded bg-gray-800 flex items-center hover:bg-yellow-900 transition-all duration-200">
            <FaBell className="mr-2" /> Updates
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-6 mb-[80px]">
        <h3 className="text-lg font-medium underline text-gray-400">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div onClick={() => navigate("/createlink")} className="cursor-pointer border border-blue-500 p-4 rounded bg-gray-800 flex items-center hover:bg-blue-900 transition-all duration-200">
            <FaLink className="mr-2" /> Generate Links
          </div>
          <div onClick={() => navigate("/buycredits")} className="cursor-pointer border border-green-500 p-4 rounded bg-gray-800 flex items-center hover:bg-green-900 transition-all duration-200">
            <FaPlus className="mr-2" /> Add Funds
          </div>
          <div onClick={() => navigate("/settings")} className="cursor-pointer border border-gray-500 p-4 rounded bg-gray-800 flex items-center hover:bg-gray-700 transition-all duration-200">
            <FaCog className="mr-2" /> Settings
          </div>
        </div>
      </div>
      
      {/* Footer Navigation */}
      <footer className="fixed font-livvic bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 p-4 flex justify-around text-center sm:text-left">
        <Link to="/dashboard" className="hover:text-blue-400 flex items-center sm:flex-col text-blue-600">
          <FaHome className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Home</span>
        </Link>
        <Link to="/links" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaLink className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Links</span>
        </Link>
        <Link to="/credits" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaWallet className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Credits</span>
        </Link>
        <Link to="/profile" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaUser className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Profile</span>
        </Link>
        <Link to="/settings" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaCog className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Settings</span>
        </Link>
      </footer>

      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-gray-800 p-6 rounded-md shadow-md text-center">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">Connect Telegram Bot</h2>

      {/* Link Preview */}
      <div className="bg-gray-700 p-4 rounded-md shadow-md mb-4 hover:bg-gray-600 transition-all duration-300">
        <a 
          href="https://t.me/Kinghavkbot" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block text-left"
        >
          <div className="flex items-center">
            <img 
              src="https://telegram.org/img/t_logo.svg" 
              alt="Telegram Logo" 
              className="w-10 h-10 mr-3"
            />
            <div>
              <p className="text-blue-400 font-medium text-lg">KingHavk Bot</p>
              <p className="text-gray-300 text-sm">Click to open the Telegram bot and start chatting.</p>
            </div>
          </div>
        </a>
      </div>

      {/* Chat ID Input */}
      <input
        type="text"
        placeholder="Enter Chat ID"
        value={chatId}
        onChange={(e) => setChatId(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white mb-4"
      />

      {/* Save and Close Buttons */}
      <div className="flex justify-between">
        <button 
          onClick={async () => {
            if (chatId.trim() !== "") {
              await saveChatId(chatId.trim());
            } else {
              alert("Please enter a Chat ID before saving.");
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-all duration-200"
        >
          {loadingChat ? "Saving..." : "Save"}
        </button>

        <button 
          onClick={() => setIsModalOpen(false)} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-all duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
}

export default Dashboard;