import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OTP() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (otp === "123456") {
            localStorage.setItem("fastor_auth", "true");
            navigate("/restaurants");
        } else {
            setError("Incorrect OTP. Use 123456");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-6">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-green-100">
                <h2 className="text-2xl font-semibold text-green-700 mb-2 text-center">
                    Enter OTP
                </h2>
                <p className="text-sm text-gray-500 mb-6 text-center">
                    We sent OTP to your mobile number
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        placeholder="123456"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex-1 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                        >
                            Back
                        </button>
                        <button
                            className="flex-1 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition shadow-md"
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
