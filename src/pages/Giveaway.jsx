import React from 'react';
import { useParams } from 'react-router-dom';

const GiveawayPage = () => {
    const { username, id } = useParams();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to {username}'s Giveaway!</h1>
            <p className="text-lg mb-4">Giveaway ID: {id}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold">Jane Kendra</h2>
                    <p className="text-gray-600">750 entries</p>
                    <span className="inline-block mt-2 px-4 py-1 text-sm bg-purple-500 text-white rounded">Leading</span>
                </div>
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold">Mary Biernacki</h2>
                    <p className="text-gray-600">375 entries</p>
                    <span className="inline-block mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded">2nd Place</span>
                </div>
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold">FASHION BRAND</h2>
                    <p className="text-gray-600">118 entries</p>
                    <span className="inline-block mt-2 px-4 py-1 text-sm bg-yellow-500 text-white rounded">3rd Place</span>
                </div>
            </div>

            <div className="mt-8 text-center">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                    Enter Giveaway on Instagram
                </button>
            </div>
        </div>
    );
};

export default GiveawayPage;

// Let me know if you want me to tweak anything! 🎯
