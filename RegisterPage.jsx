import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdmissionForm = ({ onNext }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dobYear: "",
    dobMonth: "",
    dobDay: "",
    gender: "",
    qualification: "",
    category: "",
    aadhar: "",
    mobile: "",
    alternateMobile: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    keralite: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData); // Debugging

    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      alert(response.data.message);
      navigate("/photo-upload"); // ✅ Move to Photo Upload Page after successful submission
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex justify-center items-center">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Application Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Father's & Mother's Name */}
          <div>
            <label className="block font-semibold">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Enter Father's Name"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              placeholder="Enter Mother's Name"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="mt-4">
            <label className="block font-semibold">Date of Birth</label>
            <div className="flex gap-2">
              <select name="dobYear" value={formData.dobYear} onChange={handleChange} className="border p-2 rounded-md w-1/3" required>
                <option value="">Year</option>
                {[...Array(50)].map((_, i) => (
                  <option key={i} value={1975 + i}>{1975 + i}</option>
                ))}
              </select>
              <select name="dobMonth" value={formData.dobMonth} onChange={handleChange} className="border p-2 rounded-md w-1/3" required>
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select name="dobDay" value={formData.dobDay} onChange={handleChange} className="border p-2 rounded-md w-1/3" required>
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender & Qualification */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Qualification</label>
              <select name="qualification" value={formData.qualification} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="">Select Qualification</option>
                <option value="12th">12th</option>
                <option value="Diploma">Diploma</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
          </div>

          {/* Religion */}
<div>
  <label className="block font-semibold">Religion</label>
  <select
    name="religion"
    value={formData.religion}
    onChange={handleChange}
    className="w-full p-2 border rounded"
    required
  >
    <option value="">Select Religion</option>
    <option value="Hindu">Hindu</option>
    <option value="Muslim">Muslim</option>
    <option value="Christian">Christian</option>
    <option value="Other">Other</option>
  </select>
</div>

{/* Caste */}
<div>
  <label className="block font-semibold">Caste</label>
  <input
    type="text"
    name="caste"
    value={formData.caste}
    onChange={handleChange}
    placeholder="Enter Caste"
    className="w-full p-2 border rounded"
    required
  />
</div>

{/* Category */}
<div>
  <label className="block font-semibold">Category</label>
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="w-full p-2 border rounded"
    required
  >
    <option value="">Select Category</option>
    <option value="General">General</option>
    <option value="SC">Scheduled Caste (SC)</option>
    <option value="ST">Scheduled Tribe (ST)</option>
    <option value="OBC">Other Backward Class (OBC)</option>
  </select>
</div>


          {/* Nationality & State */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Nationality</label>
              <input type="text" value="Indian" readOnly className="w-full border p-2 rounded-md bg-gray-100 cursor-not-allowed" />
            </div>
            <div>
              <label className="block font-semibold">State</label>
              <select name="state" value={formData.state} onChange={handleChange} className="border p-2 rounded-md w-full" required>
                <option value="">Select</option>
                <option value="KL">KL</option>
                <option value="TN">TN</option>
                <option value="KA">KA</option>
                <option value="MH">MH</option>
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <label className="block font-semibold">Mobile Number</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter Mobile Number" className="w-full border p-2 rounded-md" required />
          </div>
          <div>
            <label className="block font-semibold">Alternate Mobile Number</label>
            <input type="text" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} placeholder="Enter Mobile Number" className="w-full border p-2 rounded-md" required />
          </div>
          <div>
            <label className="block font-semibold">Aadhar Number</label>
            <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} placeholder="Enter Aadhar Number" className="w-full border p-2 rounded-md" required />
          </div>

          {/* Permanent Address */}
          <h2 className="text-xl font-bold mt-6 mb-4">Permanent Address</h2>
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded-md" required />
          <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" className="w-full border p-2 rounded-md" required />
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="w-full border p-2 rounded-md" required />
         

          {/* Keralite Status */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="font-semibold">Are you a Keralite?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="keralite"
                  value="Yes"
                  checked={formData.keralite === "Yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="keralite"
                  value="No"
                  checked={formData.keralite === "No"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default AdmissionForm;
