import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import Axios for API request

const PhotoSignUpload = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [error, setError] = useState("");

  // ✅ Handle File Selection
  const handleFileChange = (e, setFile) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only JPEG, PNG, and JPG files are allowed!");
        return;
      }

      setError(""); // Clear any previous errors
      setFile(selectedFile);
    }
  };

  // ✅ Handle Upload
  const handleUpload = async () => {
    if (!photo || !signature) {
      setError("Both Photo and Signature are required!");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("signature", signature);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload Success:", response.data);

      // ✅ Move to Next Page After Successful Upload
      navigate("/course-selection");
    } catch (err) {
      console.error("Upload Failed:", err);
      setError("Failed to upload files. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-500">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Upload Photo & Signature
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Photo Upload */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Upload Photo</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => handleFileChange(e, setPhoto)}
            className="w-full border p-3 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
          />
        </div>

        {/* Signature Upload */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Upload Signature</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => handleFileChange(e, setSignature)}
            className="w-full border p-3 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
          />
        </div>

        {/* Continue Button */}
        <button
          onClick={handleUpload} // ✅ Upload before navigating
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Upload & Continue
        </button>
      </div>
    </div>
  );
};

export default PhotoSignUpload;
