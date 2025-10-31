import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/fastor-logo.png';

export default function Login() {
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobile.trim().length === 10) {
            localStorage.setItem("mobile", mobile);
            navigate("/otp");
        } else {
            alert("Please enter a valid 10-digit mobile number");
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl w-[90%] max-w-sm flex flex-col items-center">
                {/* 🌿 Fastor Logo */}
                <img
                    src={logo}
                    alt="Fastor Logo"
                    className="w-24 h-auto mx-auto mb-4 object-contain drop-shadow-md"
                />

                <h1 className="text-2xl font-bold text-green-700 mb-2">Welcome to Fastor</h1>
                <p className="text-gray-500 mb-6 text-center text-sm">
                    Discover restaurants near you
                </p>

                <form onSubmit={handleSubmit} className="w-full">
                    <label className="block text-sm text-gray-600 mb-2">
                        Enter Mobile Number
                    </label>
                    <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    />
                    <button
                        type="submit"
                        className="mt-6 w-full bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition-all shadow-md"
                    >
                        Send OTP
                    </button>
                </form>
            </div>
        </div>
    );
}
