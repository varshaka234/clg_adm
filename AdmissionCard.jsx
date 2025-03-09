import React from "react";

const AdmissionCard = () => {
  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-80 h-75">
      <h2 className="text-xl font-bold text-gray-800">ACADEMIC ADMISSION - 2025</h2>
      <p className="font-bold mt-2 text-red-600">AAT</p>
      <p className="mt-2 font-semibold text-gray-800">UG & PG Application</p>
      <div className="mt-4">
        <button className="bg-gray-300 px-4 py-2 rounded-lg font-semibold shadow-md">
          APPLY HERE
        </button>
      </div>
      <div className="mt-4">
        <button className="bg-gray-300 px-4 py-2 rounded-lg font-semibold shadow-md">
          Prospectus 2025
        </button>
      </div>
    </div>
  );
};

export default AdmissionCard;
