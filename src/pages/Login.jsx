import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { useState } from 'react';
import { useAuth } from '../../AuthContext';

function Login() {
    const navigate = useNavigate()
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const {login} = useAuth()
    const [loading, setloading] = useState(false)

    const loginNow = async () => {
      setloading(true);
      try {
          const response = await fetch(`${BASE_URL}/login`, {
              method: "POST",
              body: JSON.stringify({
                  username: username,
                  password: password
              }),
              headers: {
                  "Content-Type": "application/json"
              }
          });
  
          const result = await response.json();
  
          if (!response.ok) {
              switch (response.status) {
                  case 400:
                      alert(result.error || "Username and password are required.");
                      break;
                  case 401:
                      alert(result.error || "Invalid username or password.");
                      break;
                  case 500:
                      alert("Server error. Please try again later.");
                      break;
                  default:
                      alert("An unexpected error occurred. Please try again.");
              }
              return;
          }
  
          // Handle successful login
          alert("Login successful!");
          console.log("User ID:", result.user_id);
          console.log("Balance:", result.balance);
          localStorage.setItem("username", username)
          console.log("Token:", result.token);
          const us = {
            "username": username,
            "user_id": result.user_id
          }
          await login(us, result.token)
          navigate("/dashboard")
  
      } catch (error) {
          console.error("Error: ", error);
          alert("Network error. Please check your connection.");
      } finally {
          setloading(false);
      }
  };
  
  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" 
      style={{ backgroundImage: "url('/background1.jpg')" }}>
      
      {/* Terminal Container */}
      <div className="w-[400px] bg-black border border-green-500 text-green-400 font-mono p-6 shadow-lg">
        
        {/* Terminal Header */}
        <div className="bg-green-800 px-3 py-2 text-black flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-green-300 font-bold">Access Terminal</span>
        </div>

        {/* Terminal Body */}
        <div className="p-4">
          <p className="text-green-300">User@HackSystem:~$ <span className="animate-pulse">█</span></p>
          
          {/* Login Form */}
          <div className="mt-4">
            <label className="block text-green-400 mb-1">Username:</label>
            <input type="text" className="w-full bg-black border border-green-500 text-green-300 px-2 py-1 focus:outline-none focus:border-green-300" placeholder="root" value={username} onChange={(e) => setusername(e.target.value)}/>

            <label className="block text-green-400 mt-3 mb-1">Password:</label>
            <input type="password" className="w-full bg-black border border-green-500 text-green-300 px-2 py-1 focus:outline-none focus:border-green-300" placeholder="********" value={password} onChange={(e) => setpassword(e.target.value)} />

            <button onClick={loginNow} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-black font-bold py-2">
              {loading ? "Accessing..." : "Access Granted"}
            </button>
          </div>

          {/* Signup Link */}
          <p className="mt-3 text-sm">
            Need an account? <Link to="/signup" className="text-green-400 underline">Request Access</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
