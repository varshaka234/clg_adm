import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdmissionCard from "./components/AdmissionCard";
import AboutUs from "./pages/AboutUs";
import Signup from "./pages/Signup";
import UGPrograms from "./pages/UGPrograms";
import PGPrograms from "./pages/PGPrograms";
import ShortCourses from "./pages/ShortCourses";
import ResearchPrograms from "./pages/ResearchPrograms";
import ContactUs from "./pages/ContactUs";
import Downloads from "./pages/Downloads";
import LoginForm from "./components/LoginForm";
import StudentDashboard from "./components/StudentDashboard";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./components/AdminDashboard";
import ExamAuthorityDashboard from "./components/ExamAuthorityDashboard";
import ManageApplications from "./pages/ManageApplications";
import ConductExam from "./pages/ConductExam";
import PublishResults from "./pages/PublishResults";
import CourseManagement from "./pages/CourseManagement";
import DocumentVerification from "./pages/DocumentVerification";
import PaymentProcessing from "./pages/PaymentProcessing";
import LastRank from "./pages/LastRank";
import BtechRank from "./pages/BtechRank";
import MtechRank from "./pages/MtechRank";
import MbaRank from "./pages/MbaRank";
import PhdRank from "./pages/PhdLastRank";

// ✅ Home Component
const Home = () => (
  <div className="relative h-screen">
    <img
      src="/background.jpg"
      alt="University"
      className="absolute top-0 left-0 w-screen h-screen object-cover"
    />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
      <h1 className="text-3xl font-bold">Welcome to Oxfordia University</h1>
      <div className="mt-10 flex space-x-6">
        <AdmissionCard />
        <LoginForm />
      </div>
    </div>
  </div>
);

// ✅ Main App Component
function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ug-programs" element={<UGPrograms />} />
          <Route path="/pg-programs" element={<PGPrograms />} />
          <Route path="/short-courses" element={<ShortCourses />} />
          <Route path="/research-programs" element={<ResearchPrograms />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/last-rank" element={<LastRank />} />
          <Route path="/last-rank/btech" element={<BtechRank />} />
          <Route path="/last-rank/mtech" element={<MtechRank />} />
          <Route path="/last-rank/mba" element={<MbaRank />} />
          <Route path="/last-rank/phd" element={<PhdRank />} />

          {/* ✅ Remove authentication checks */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/exam-authority" element={<ExamAuthorityDashboard />} />
          <Route path="/manage-applications" element={<ManageApplications />} />
          <Route path="/conduct-exam" element={<ConductExam />} />
          <Route path="/publish-results" element={<PublishResults />} />
          <Route path="/course-management" element={<CourseManagement />} />
          <Route path="/document-verification" element={<DocumentVerification />} />
          <Route path="/payment-processing" element={<PaymentProcessing />} />

          {/* ✅ Fallback Route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
