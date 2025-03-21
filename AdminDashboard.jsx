import React, { useState } from "react";
import { 
  HomeIcon, UsersIcon, ClipboardDocumentListIcon, 
  BellIcon, CogIcon, BookOpenIcon, MegaphoneIcon,
  DocumentTextIcon, ChartBarIcon, UserCircleIcon, 
  MagnifyingGlassIcon 
} from "@heroicons/react/24/outline";

import RankList from "../pages/RankList"; // Adjust path if needed




export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-5 space-y-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <nav>
          <SidebarItem icon={HomeIcon} label="Dashboard" onClick={() => setActiveTab("dashboard")} />
          <SidebarItem icon={UsersIcon} label="Applicants" onClick={() => setActiveTab("applicants")} />
          <SidebarItem icon={ClipboardDocumentListIcon} label="Exam Management" onClick={() => setActiveTab("exam")} />
          <SidebarItem icon={BellIcon} label="Notifications" onClick={() => setActiveTab("notifications")} />
          <SidebarItem icon={CogIcon} label="Settings" onClick={() => setActiveTab("settings")} />
          <SidebarItem icon={MagnifyingGlassIcon} label="Search Applications" onClick={() => setActiveTab("search")} />
          <SidebarItem icon={BookOpenIcon} label="Courses" onClick={() => setActiveTab("courses")} />
          <SidebarItem icon={MegaphoneIcon} label="Notices" onClick={() => setActiveTab("notices")} />
          <SidebarItem icon={DocumentTextIcon} label="Pages" onClick={() => setActiveTab("pages")} />
          <SidebarItem icon={UsersIcon} label="Subscribers" onClick={() => setActiveTab("subscribers")} />
          <SidebarItem icon={ChartBarIcon} label="Reports" onClick={() => setActiveTab("reports")} />
          <SidebarItem icon={UserCircleIcon} label="Profile" onClick={() => setActiveTab("profile")} />
          <SidebarItem icon={ChartBarIcon} label="Rank List" onClick={() => setActiveTab("rankList")} />

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "applicants" && <Applicants />}
        {activeTab === "exam" && <ExamManagement />}
        {activeTab === "search" && <SearchApplications />}
        {activeTab === "courses" && <CourseManagement />}
        {activeTab === "notices" && <NoticeManagement />}
        {activeTab === "rankList" && <RankList examId={101} />}
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, onClick }) {
  return (
    <div
      className="flex items-center space-x-2 p-3 cursor-pointer hover:bg-blue-700 rounded"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </div>
  );
}

/* ✅ FIX: Move Dashboard function ABOVE AdminDashboard to prevent ReferenceError */
function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <DashboardCard title="Total Applicants" count={120} />
        <DashboardCard title="Pending Approvals" count={34} />
        <DashboardCard title="Total Courses" count={10} />
      </div>
    </div>
  );
}

function DashboardCard({ title, count }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-blue-900">{count}</p>
    </div>
  );
}

function Applicants() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Applications</h2>
      <table className="w-full mt-4 bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Qualification</th>
            <th className="p-2">Course</th>
            <th className="p-2">Payment</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">John Doe</td>
            <td className="p-2">B.Sc</td>
            <td className="p-2">MCA</td>
            <td className="p-2">Paid</td>
            <td className="p-2 text-yellow-600">Pending</td>
            <td className="p-2">
              <button className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded ml-2">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ExamManagement() {
  const [examDate, setExamDate] = useState("");
  const [examCenter, setExamCenter] = useState("");

  function handleSetExam() {
    if (!examDate || !examCenter) {
      alert("Please fill all details");
      return;
    }
    console.log("Exam Set:", { examDate, examCenter });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Exam Management</h2>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <label className="block mb-2">Select Date:</label>
        <input 
          type="date" 
          value={examDate} 
          onChange={(e) => setExamDate(e.target.value)} 
          className="p-2 border rounded w-full" 
        />

        <label className="block mt-4 mb-2">Select Center:</label>
        <input 
          type="text" 
          value={examCenter} 
          onChange={(e) => setExamCenter(e.target.value)}
          placeholder="Enter exam center" 
          className="p-2 border rounded w-full" 
        />

        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" 
          onClick={handleSetExam}
        >
          Set Exam
        </button>
      </div>
    </div>
  );
}


function SearchApplications() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Search Applications</h2>
      <input type="text" placeholder="Search by Name, Email, or Contact" className="w-full p-2 border rounded mt-2" />
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Search</button>
    </div>
  );
}

function CourseManagement() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Mathematics" },
    { id: 3, name: "Physics" },
  ]);
  const [newCourse, setNewCourse] = useState("");

  const addCourse = () => {
    if (newCourse.trim() === "") return;
    setCourses([...courses, { id: courses.length + 1, name: newCourse }]);
    setNewCourse("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Manage Courses</h2>
      <input
        type="text"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
        placeholder="Enter course name"
        className="w-full p-2 border rounded mt-2"
      />
      <button onClick={addCourse} className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Add Course</button>

      <ul className="list-disc pl-5 mt-4">
        {courses.map((course) => (
          <li key={course.id} className="text-gray-700">{course.name}</li>
        ))}
      </ul>
    </div>
  );
}

function NoticeManagement() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Manage Notices</h2>
      <textarea placeholder="Write Notice" className="w-full p-2 border rounded mt-2"></textarea>
      <button className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded">Publish Notice</button>
    </div>
  );
}


