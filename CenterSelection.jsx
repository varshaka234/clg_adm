import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CenterSelection = () => {
  const navigate = useNavigate();
  const [selectedCenter, setSelectedCenter] = useState("");

  const handleProceed = () => {
    if (!selectedCenter) {
      alert("Please select an exam center!");
      return;
    }
    navigate("/fee-payment"); // ✅ Navigate to Fee Payment
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🏛 Select Exam Center</h2>

        <select
          value={selectedCenter}
          onChange={(e) => setSelectedCenter(e.target.value)}
          className="w-full border p-3 rounded-md"
        >
          <option value="">-- Choose Exam Center --</option>
          <option value="ABC Institute">ABC Institute, City A</option>
          <option value="XYZ College">XYZ College, City B</option>
          <option value="DEF University">DEF University, City C</option>
        </select>

        <button
          onClick={handleProceed}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold mt-4 hover:bg-blue-700 transition"
        >
          Confirm & Proceed to Payment 💳
        </button>
      </div>
    </div>
  );
};

export default CenterSelection;
