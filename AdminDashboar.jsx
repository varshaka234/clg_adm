import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaBook, FaBars } from "react-icons/fa";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-800 text-white w-64 p-5 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/admin/applicants" className="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <FaUsers /> View Applicants
          </Link>
          <Link to="/admin/approve-applications" className="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <FaCheckCircle /> Approve Applications
          </Link>
          <Link to="/admin/deny-applications" className="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <FaTimesCircle /> Deny Applications
          </Link>
          <Link to="/admin/manage-courses" className="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <FaBook /> Manage Courses
          </Link>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <button
          className="md:hidden p-2 bg-blue-600 text-white rounded mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
        <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
        <p className="mt-2 text-gray-600">Manage applications and courses from the sidebar.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
