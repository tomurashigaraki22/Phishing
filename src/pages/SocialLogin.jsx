import React, { useState } from 'react';

const SocialLogin = () => {
    const [platform, setPlatform] = useState('facebook');

    const renderLoginForm = () => {
        switch (platform) {
            case 'facebook':
                return (
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Facebook</h1>
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            className="w-full p-3 border border-gray-300 rounded mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded mb-6"
                        />
                        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
                            Log In
                        </button>
                        <p className="text-blue-500 text-center mt-4 cursor-pointer">Forgot password?</p>
                        <hr className="my-6" />
                        <button className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600">
                            Create New Account
                        </button>
                    </div>
                );
            case 'instagram':
                return (
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <h1 className="text-3xl font-bold text-pink-500 text-center mb-6">Instagram</h1>
                        <input
                            type="text"
                            placeholder="Username or Email"
                            className="w-full p-3 border border-gray-300 rounded mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded mb-6"
                        />
                        <button className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600">
                            Log In
                        </button>
                        <p className="text-blue-500 text-center mt-4 cursor-pointer">Forgot password?</p>
                        <hr className="my-6" />
                        <p className="text-center">Don't have an account? <span className="text-pink-500 cursor-pointer">Sign up</span></p>
                    </div>
                );
            case 'tiktok':
                return (
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <h1 className="text-3xl font-bold text-black text-center mb-6">TikTok</h1>
                        <input
                            type="text"
                            placeholder="Email or Username"
                            className="w-full p-3 border border-gray-300 rounded mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded mb-6"
                        />
                        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
                            Log In
                        </button>
                        <p className="text-gray-500 text-center mt-4 cursor-pointer">Forgot password?</p>
                        <hr className="my-6" />
                        <p className="text-center">Don't have an account? <span className="text-black cursor-pointer">Sign up</span></p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="flex space-x-4 mb-8">
                <button
                    className={`py-2 px-4 rounded ${platform === 'facebook' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setPlatform('facebook')}
                >
                    Facebook
                </button>
                <button
                    className={`py-2 px-4 rounded ${platform === 'instagram' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setPlatform('instagram')}
                >
                    Instagram
                </button>
                <button
                    className={`py-2 px-4 rounded ${platform === 'tiktok' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setPlatform('tiktok')}
                >
                    TikTok
                </button>
            </div>
            {renderLoginForm()}
        </div>
    );
};

export default SocialLogin;
