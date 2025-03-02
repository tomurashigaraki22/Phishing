import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaLink, FaWallet, FaUser, FaCog } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import jwt_decode from "jwt-decode";

function Links() {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatId, setchatId] = useState(null)

  useEffect(() => {
    const main = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const m = localStorage.getItem("chatId");
        setchatId(m)
        const { user_id, email } = decodedToken;

        const response = await fetch(`${BASE_URL}/get_links/${user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch links");
          return;
        }

        const respData = await response.json();

        if (respData.status === 200 && Array.isArray(respData.links)) {
          setLinks(respData.links.reverse());
        } else {
          console.warn("No links found or unexpected response format");
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    main();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[#0a0e17] text-white p-6 font-livvic">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-[#6f00ff]">UST</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-md">
            <span className="text-sm text-gray-300">0 C</span>
            <button className="ml-2 text-green-400 hover:text-green-300">
              Buy
            </button>
          </div>
          <button className="text-gray-300 hover:text-red-400">Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div className="mt-6 pb-20">
        <h2 className="text-2xl font-semibold text-green-400">My Links</h2>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          </div>
        )}

        {/* Links Table */}
        {!loading && links.length > 0 ? (
          <div className="mt-6 overflow-y-auto overflow-x-auto rounded-md p-2 rounded-md">
            <table className="min-w-full bg-gray-800 rounded-lg border-gray-800">
            <thead className="bg-gray-800">
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Link ID</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Expiry Date</th>
                  <th className="py-2 px-4 border-b">Created At</th>
                  <th className="py-2 px-4 border-b">Duration</th>
                  <th className="py-2 px-4 border-b">Social Media</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-800 text-center">
                    <td className="py-2 px-4 border-b">{link.id}</td>
                    <td
                      className="py-2 px-4 border-b text-blue-400 hover:underline cursor-pointer"
                      onClick={() => navigate(`${link.link}/${link.social_media}`)}
                    >
                      {link.link_id}
                    </td>
                    <td className="py-2 px-4 border-b">{link.status}</td>
                    <td className="py-2 px-4 border-b">
                      {link.expiry_date || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {link.created_at || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">{link.duration}</td>
                    <td className="py-2 px-4 border-b">{link.social_media}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <div className="mt-8 text-center text-gray-400">
              No links found. Create your first link!
            </div>
          )
        )}

        {/* Create New Link */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/createlink")}
            className="bg-[#8dd35f] text-black px-4 py-2 rounded-md hover:bg-green-500"
          >
            Create New Link
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 p-4 flex justify-around text-center sm:text-left">
        <Link
          to="/dashboard"
          className="hover:text-yellow-400 flex items-center sm:flex-col"
        >
          <FaHome className="mr-1 sm:mr-0" />{" "}
          <span className="hidden sm:inline">Home</span>
        </Link>
        <Link
          to="/links"
          className="hover:text-blue-400 flex items-center sm:flex-col text-blue-600"
        >
          <FaLink className="mr-1 sm:mr-0" />{" "}
          <span className="hidden sm:inline">Links</span>
        </Link>
        <Link
          to="/credits"
          className="hover:text-yellow-400 flex items-center sm:flex-col"
        >
          <FaWallet className="mr-1 sm:mr-0" />{" "}
          <span className="hidden sm:inline">Credits</span>
        </Link>
        <Link
          to="/profile"
          className="hover:text-yellow-400 flex items-center sm:flex-col"
        >
          <FaUser className="mr-1 sm:mr-0" />{" "}
          <span className="hidden sm:inline">Profile</span>
        </Link>
        <Link
          to="/settings"
          className="hover:text-yellow-400 flex items-center sm:flex-col"
        >
          <FaCog className="mr-1 sm:mr-0" />{" "}
          <span className="hidden sm:inline">Settings</span>
        </Link>
      </footer>
    </div>
  );
}

export default Links;
