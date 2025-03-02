import React, { useEffect, useState } from 'react';
import { FaHome, FaLink, FaWallet, FaUser, FaCog, FaTelegram, FaBook, FaBell, FaPlus, FaKey } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';
import { Link } from 'react-router';

function BuyCredits() {
  const [amount, setAmount] = useState(3000);
  const [message, setMessage] = useState("")
  const [modalOpen, setmodalOpen] = useState(false)

  const toggleModal = () => {
    setmodalOpen(!modalOpen)
  }

  useEffect(() => {
    if (amount < 3000){
        setMessage("Amount should not be less than 3000 credits")
    } else{
        setMessage("")
    }
  }, [amount])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 font-livvic">Buy Credits</h1>
        <p className="mb-6 font-livvic">Purchase credits to use premium features</p>
        
        <div className="bg-gray-800 p-6 rounded-xl">
          <label className="block mb-2 font-livvic">Amount (₦)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="4000"
            max="1000000"
            className="w-full p-3 bg-gray-700 rounded-lg outline-none border font-livvic border-gray-600"
          />
          <div className="flex justify-between font-livvic text-sm text-gray-400 mt-2">
            <span>Min: 3,000 credits</span>
            <span>Max: 1,000,000 credits</span>
          </div>
          <div className='mt-3'>
            <p className='text-red-400 text-sm text-left font-livvic'>{message}</p>
          </div>
          <div className='border border-gray-600 rounded-md px-2 py-3 text-left w-full flex flex-row items-left space-x-3'>
            <FaShield color='blue' size={23}/>
            <p className='text-md font-livvic'>Secure Bank Transfer</p>
          </div>
          
          <button onClick={toggleModal} className="w-full font-livvic mt-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500">
            Pay ₦{amount}
          </button>
        </div>
      </div>

      {modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-lg font-bold mb-4">Bank Transfer Information</h2>
      <p className="mb-2">Amount to Pay:</p>
      <p className="text-lg font-semibold">₦3,000</p>

      <div className="bg-gray-800 p-4 rounded-md my-4">
        <p>Bank Name: Moniepoint Microfinance Bank</p>
        <p>Account Number: 8071273078</p>
        <p>Account Name: Raphael Tomiwa</p>
      </div>

      <p className="mb-2 font-semibold">Instructions:</p>
      <ul className="text-sm space-y-2">
        <li>1. Make the payment to the bank account above.</li>
        <li>2. Take a screenshot or photo of your payment receipt.</li>
        <li>3. Send the receipt along with your email address to us on WhatsApp: [Your WhatsApp Number]</li>
        <li>4. We will verify and credit your account within 24 hours.</li>
      </ul>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mt-4 w-full rounded-md"
        onClick={() => setmodalOpen(false)}
      >
        Close
      </button>
    </div>
  </div>
)}



      <footer className="fixed font-livvic bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 p-4 flex justify-around text-center sm:text-left">
        <Link to="/dashboard" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaHome className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Home</span>
        </Link>
        <Link to="/links" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaLink className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Links</span>
        </Link>
        <Link to="/credits" className="hover:text-blue-400 flex items-center sm:flex-col text-blue-600">
          <FaWallet className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Credits</span>
        </Link>
        <Link to="/profile" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaUser className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Profile</span>
        </Link>
        <Link to="/settings" className="hover:text-yellow-400 flex items-center sm:flex-col">
          <FaCog className="mr-1 sm:mr-0" /> <span className="hidden sm:inline">Settings</span>
        </Link>
      </footer>
    </div>
  );
}

export default BuyCredits;