import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaLink, FaWallet, FaUser, FaCog } from "react-icons/fa";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import { BASE_URL } from "../../config";

function Credits() {
  const navigate = useNavigate()
  const [balance, setBalance] = useState("...")
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const getBalance = async () => {
    setLoading(true)
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
          localStorage.setItem("balance", data.balance)
          setBalance(data.balance)


          //new one

          const response2 = await fetch(`${BASE_URL}/get_transactions`, {
            method: "POST",
            body: JSON.stringify({
              user_id: user_id
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })

          if (!response2.ok) {
            const errorData = await response.json();
            console.error("Failed to fetch transactions:", errorData.error);
            return;
          }

          const data2 = await response2.json();
          setTransactions(data2.transactions.reverse())

  
          return data, data2;
      } catch (error) {
          console.error("Error fetching balance:", error);
      } finally{
        setLoading(false)
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

      {/* Credits Section */}
      <div className="mt-6 space-y-6 pb-20">
        {/* Buy Credits */}
        <div className="bg-[#111827] p-6 rounded-lg">
          <button onClick={() => navigate("/buycredits")} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 text-lg font-semibold">
            + Buy Credits
          </button>
          <p className="mt-4 text-lg font-semibold text-green-400">0 Credits</p>
        </div>

        {/* Transaction History */}
        <div className="bg-[#111827] p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Transaction History</h2>
          {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : transactions.length === 0 ? (
        <p className="text-gray-400 mt-2">No transactions yet</p>
      ) : (
        <div className="mt-4">
          <div className="overflow-y-auto max-h-80">
            <table className="min-w-full bg-gray-800 rounded-lg">
              <thead>
                <tr className="text-gray-300 text-center">
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Created At</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="text-gray-300 text-center">
                    <td className="py-2 px-4 border-b">{tx.id}</td>
                    <td className="py-2 px-4 border-b">{tx.amount.toFixed(2)} C</td>
                    <td
  className={`py-2 px-4 border-b font-semibold ${
    tx.type === "credit" ? "text-green-400" : "text-red-400"
  }`}
>
  {tx.type.toUpperCase()}
</td>

                    <td
                      className={`py-2 px-4 border-b ${
                        tx.status === "completed"
                          ? "text-green-400"
                          : tx.status === "pending"
                          ? "text-yellow-400"
                          : tx.status === "cancelled"
                          ? "text-gray-400"
                          : "text-red-400"
                      }`}
                    >
                      {tx.status}
                    </td>
                    <td className="py-2 px-4 border-b">{tx.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-20 right-6">
        <a href="https://wa.me/+2347044831729" target="_blank" rel="noopener noreferrer">
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

export default Credits;
