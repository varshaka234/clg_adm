import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserGraduate, FaFileAlt, FaDollarSign, FaLock, FaSignOutAlt } from "react-icons/fa";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const studentId = localStorage.getItem("studentId"); // ✅ Fetch student ID from storage

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ Fetch student marks & rank if ID exists
    if (studentId) {
      axios
        .get(`/api/student-marks/${studentId}`)
        .then((res) => setStudentData(res.data))
        .catch((err) => console.error("Error fetching student data:", err));
    }
  }, [navigate, studentId]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-5 space-y-6">
        <h1 className="text-2xl font-bold">User</h1>
        <nav className="space-y-3">
          <a href="#" className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg">
            <FaUserGraduate />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-3 hover:bg-gray-800 rounded-lg">
            <FaFileAlt />
            <span>Admission Form</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-3 hover:bg-gray-800 rounded-lg">
            <FaDollarSign />
            <span>Submit Fees</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-3 hover:bg-gray-800 rounded-lg">
            <FaLock />
            <span>Change Password</span>
          </a>
        </nav>
        <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-600 rounded-lg">
          <FaSignOutAlt />
          <span>LOGOUT</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold">User Dashboard</h2>

        {/* Success Message */}
        <div className="bg-green-500 text-white p-3 rounded-lg my-5">
          Logged In Successfully
        </div>

        {/* Course Application Section */}
        <div className="bg-white shadow-md rounded-lg p-5 mb-5">
          <h3 className="text-xl font-semibold">Apply for your course</h3>
          <button className="mt-3 bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={() => navigate("/register-page")}>
            START REGISTRATION
          </button>
        </div>

        {/* Student Marks & Rank Section */}
        {studentData ? (
          <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold">Exam Results</h3>
            <p><strong>Name:</strong> {studentData.name}</p>
            <p><strong>Marks:</strong> {studentData.marks}</p>
            <p><strong>Rank:</strong> {studentData.rank}</p>
          </div>
        ) : (
          <p className="text-gray-600">Loading student data...</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
