
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExamFeePayment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-lg w-full bg-white p-8 shadow-xl rounded-xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Exam Fee Payment</h2>

        {/* Fee Details */}
        <div className="bg-gray-200 p-4 rounded-md text-left mb-6">
          <p className="text-lg font-semibold">💰 Exam Fee: <span className="text-green-600">$50.00</span></p>
        </div>

        {/* Payment Options */}
        <div className="text-left mb-6">
          <label className="font-semibold block mb-2">Select Payment Method:</label>
          <select
            className="w-full border p-3 rounded-md"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit-card">💳 Credit / Debit Card</option>
            <option value="upi">📱 UPI / QR Code</option>
            <option value="net-banking">🏦 Net Banking</option>
          </select>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={() => navigate("/exam-confirmation")} // ✅ Move to Exam Confirmation Page
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
        >
          Pay & Proceed
        </button>

        <p className="text-gray-500 text-sm mt-4">Secure payment powered by XYZ Payments</p>
      </div>
    </div>
  );
};

export default ExamFeePayment;
