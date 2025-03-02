import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaLink, FaWallet, FaUser, FaCog } from "react-icons/fa";
import { useEffect, useState } from "react";

function Settings() {
  const [balance, setBalance] = useState("...")
  const navigate = useNavigate()

  useEffect(() => {
    const main = async () => {
      const bal = localStorage.getItem("balance")
      setBalance(bal)
    }

    main()
  })

  return (
    <div className="min-h-screen w-screen bg-[#0a0e17] text-white p-6 font-livvic">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-[#6f00ff]">UST</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-md">
            <span className="text-sm text-gray-300">{balance} C</span>
            <button className="ml-2 text-green-400 hover:text-green-300" onClick={() => navigate("/buycredits")}>Buy</button>
          </div>
          <button className="text-gray-300 hover:text-red-400">Logout</button>
        </div>
      </nav>

      {/* Settings Section */}
      <div className="flex flex-col items-center w-full">
        <div className="mt-6 bg-[#111827] p-6 rounded-lg lg:w-[55%] w-[90%] self-center align-center items-center">
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-gray-400 text-sm">Manage your account settings and preferences</p>

            {/* Notifications */}
            <div className="mt-6">
            <h3 className="text-lg font-semibold">🔔 Notifications</h3>
            <p className="text-gray-400 text-sm">Enable Telegram Notifications</p>
            <div className="flex items-center justify-between mt-2">
                <span className="text-gray-300">Receive Telegram notifications</span>
                <input type="checkbox" className="toggle-checkbox" />
            </div>

            {/* Telegram ID */}
            <div className="mt-4">
                <label className="block text-gray-300">Telegram ID</label>
                <input
                type="text"
                value="0"
                className="mt-1 w-full p-2 bg-gray-700 text-white rounded-md"
                readOnly
                />
            </div>

            {/* Change Telegram ID Button */}
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                Change Telegram ID
            </button>
            </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-20 right-6">
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-12 h-12"
          />
        </a>
      </div>

      {/* Footer Navigation */}
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
        <Link to="/profile" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaUser className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Profile</span>
        </Link>
        <Link to="/settings" className="hover:text-blue-400 flex items-center sm:flex-col text-blue-600">
          <FaCog className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Settings</span>
        </Link>
      </footer>
    </div>
  );
}

export default Settings;
