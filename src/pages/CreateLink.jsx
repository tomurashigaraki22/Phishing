import React, { useEffect, useState } from "react";
import { FaHome, FaLink, FaWallet, FaUser, FaCog } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import jwt_decode from 'jwt-decode'
import { BASE_URL } from "../../config";

const SocialMediaForm = () => {
  const [option, setOption] = useState("Voting");
  const [otpOption, setotpOption] = useState("Yes")
  const [duration2, setDuration] = useState("1 Week")
  const [retries2, setRetries] = useState(1)
  const [imageUrl, setimageUrl] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [loading, setLoading] = useState(false)
  const [bannerImg, setbannerImg] = useState("")
  const navigate = useNavigate()
  const [socialMedias, setsocialMedias] = useState("Facebook")
  const [balance, setBalance] = useState("...")
  const [amount, setAmount] = useState(3000)




  useEffect(() => {
    let pricePerWeek = 3000;
  
    switch (duration2) {
      case "1 Week":
        setAmount(pricePerWeek * 1);
        break;
      case "2 Weeks":
        setAmount(pricePerWeek * 2);
        break;
      case "1 Month":
        setAmount(pricePerWeek * 4); // Approx 4 weeks
        break;
      case "2 Months":
        setAmount(pricePerWeek * 8); // Approx 8 weeks
        break;
      case "3 Months":
        setAmount(pricePerWeek * 12); // Approx 12 weeks
        break;
      default:
        setAmount(3000);
        break;
    }
  }, [duration2]);

  const generateLinkNow = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("You need to log in to generate a link")
        setLoading(false)
        return
      }
  
      const decodedToken = jwt_decode(token)
      const { user_id, email } = decodedToken
  
      const response = await fetch(`${BASE_URL}/generate_link`, {
        method: "POST",
        body: JSON.stringify({
          type: option,
          username: email.split("@")[0],
          user_id: user_id,
          duration: duration2,
          social_media: socialMedias,
          amount: amount
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
  
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to generate link: ${errorText}`)
      }
  
      const resp2 = await response.json()
  
      if (resp2.status === 200) {
        console.log("Generated Link successfully")
        alert("Link generated successfully!")
        setGeneratedLink(resp2.link) // Save the link to state if you want to display it
      } else {
        console.warn("Unexpected status:", resp2)
        alert("Failed to generate link. Please try again.")
      }
    } catch (error) {
      console.error("Error: ", error)
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }
  


  const getBalance = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found in localStorage");
                return;
            }
    
            const decodedToken = jwt_decode(token);
            const { email, user_id } = decodedToken;
    
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
    <div className="p-4 md:p-6 bg-gray-800 rounded-lg shadow-lg font-livvic">
      <nav className="flex flex-col md:flex-row justify-between items-center py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-[#6f00ff]">UST</h1>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-md">
            <span className="text-sm text-gray-300">{balance} C</span>
            <button className="ml-2 text-green-400 hover:text-green-300" onClick={() => navigate("/buycredits")}>
              Buy
            </button>
          </div>
          <button className="text-gray-300 hover:text-red-400">Logout</button>
        </div>
      </nav>

      <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto px-4 sm:px-10 mt-5 mb-20">
        <h1 className="text-2xl font-bold text-blue-400 mb-6 font-livvic">
          Create Social Media Link
        </h1>

        {generatedLink !== "" && (
          <>
            <div className="text-white font-livvic text-md font-bold text-center w-full">
            Link generated successfully:
          </div>
          <div className="text-white font-livvic text-sm text-center w-full hover:text-blue-400 cursor-pointer" onClick={() => navigate(generatedLink)}>
            {generatedLink}
          </div>
          </>
        )}

        {/* Type Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-white text-md font-bold">Type</label>
          <div className="grid grid-cols-2 md:flex md:space-x-4 gap-4">
            {["Voting", "Giveaway"].map((type) => (
              <button
                key={type}
                onClick={() => setOption(type)}
                className={
                  option === type
                    ? "px-4 py-2 hover:bg-blue-400 bg-blue-500 text-gray-300 rounded font-bold font-livvic rounded-full"
                    : "px-4 py-2 hover:bg-blue-400 text-gray-300 font-bold rounded font-livvic rounded-full"
                }
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div className="mb-4">
          <label className="block mb-2 text-white">Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setimageUrl(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white">Banner Image URL</label>
          <input
            type="text"
            placeholder="Enter banner image URL"
            value={bannerImg}
            onChange={(e) => setbannerImg(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4 text-white">
          <label className="block mb-2">Link Name</label>
          <input
            type="text"
            placeholder="Give this link a name"
            className="w-full p-2 bg-gray-700 text-white rounded outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* OTP and Password Retries */}
        <div className="mb-4">
          <label className="block mb-2 text-white">Ask for OTP</label>
          <div className="grid grid-cols-2 gap-4 md:flex md:space-x-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                onClick={() => setotpOption(option)}
                className={otpOption === option ? "items-center text-center px-4 py-2 bg-blue-400 text-gray-900 rounded-full hover:bg-blue-400": "text-center px-4 py-2 text-white rounded-full hover:bg-blue-400"}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white">Ask for OTP</label>
          <div className="grid grid-cols-2 gap-4 md:flex md:space-x-4">
            {["Facebook", "Instagram", "Tiktok"].map((social) => (
              <button
                key={social}
                onClick={() => setsocialMedias(social)}
                className={social === socialMedias ? "items-center text-center px-4 py-2 bg-blue-400 text-gray-900 rounded-full hover:bg-blue-400": "text-center px-4 py-2 text-white rounded-full hover:bg-blue-400"}
              >
                {social}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white">Number of Password Retries</label>
          <div className="grid grid-cols-3 gap-4 w-[40%] items-center">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setRetries(num)}
                className={retries2 === num ? "items-center text-center px-4 py-2 bg-blue-400 text-gray-900 rounded-full hover:bg-blue-400": "text-center px-4 py-2 text-white rounded-full hover:bg-blue-400"}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block mb-2 text-white">Duration</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:space-x-4 gap-4">
            {["1 Week", "2 Weeks", "1 Month", "2 Months", "3 Months"].map((duration) => (
              <button
                key={duration}
                onClick={() => setDuration(duration)}
                className={duration2 === duration ? "px-4 py-2 bg-blue-400 text-gray-900 rounded-full hover:bg-blue-400": "px-4 py-2 text-white rounded-full hover:bg-blue-400"}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Submit */}
        <div className="text-right">
          <p className="text-lg mb-4 text-white font-semibold font-livvic">Price: {amount} credits</p>
          <button disabled={loading} onClick={() => generateLinkNow()} className="px-6 py-2 bg-blue-600 text-gray-300 rounded hover:bg-blue-500 font-semibold font-livvic">
            {loading ? "Loading" : "Buy"}
          </button>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white border-t border-gray-700 p-4 flex justify-around text-center">
        <Link to="/dashboard" className="hover:text-yellow-400 flex flex-col items-center">
          <FaHome /> <span className="hidden sm:inline">Home</span>
        </Link>
        <Link
          to="/links"
          className="hover:text-blue-400 flex flex-col items-center text-blue-600"
        >
          <FaLink /> <span className="hidden sm:inline">Links</span>
        </Link>
        <Link to="/credits" className="hover:text-yellow-400 flex flex-col items-center">
          <FaWallet /> <span className="hidden sm:inline">Credits</span>
        </Link>
        <Link to="/profile" className="hover:text-yellow-400 flex flex-col items-center">
          <FaUser /> <span className="hidden sm:inline">Profile</span>
        </Link>
        <Link to="/settings" className="hover:text-yellow-400 flex flex-col items-center">
          <FaCog /> <span className="hidden sm:inline">Settings</span>
        </Link>
      </footer>
    </div>
  );
};

export default SocialMediaForm;
