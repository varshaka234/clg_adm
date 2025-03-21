import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home"; 
import Navbar from "./components/Navbar";
import AdmissionProcess from "./components/AdmissionProcess";
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
import RegisterPage from "./pages/RegisterPage";
import PhotoSignUpload from "./components/PhotoSignUpload";
import ProgramSelection from "./components/ProgramSelection";
import CenterSelection from "./components/CenterSelection";
import ExamFeePayment from "./components/ExamFeePayment";
import AdminLogin from "./components/AdminLogin";
import ExamDetails from "./components/ExamDetails";
import AdminExamManagement from "./components/AdminExamManagement";
import RankList from "./pages/RankList"; // ✅ Ensure this is present




function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/admission-process" element={<AdmissionProcess />} />
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

          {/* ✅ Added Rank List Route */}
          <Route path="/rank-list/:course" element={<RankList />} />

          {/* Student Dashboard */}
          <Route path="/dashboard" element={<StudentDashboard />} />

          {/* Exam Authority Dashboard */}
          <Route path="/exam-authority" element={<ExamAuthorityDashboard />} />
          <Route path="/manage-applications" element={<ManageApplications />} />
          <Route path="/conduct-exam" element={<ConductExam />} />
          <Route path="/publish-results" element={<PublishResults />} />
          <Route path="/course-management" element={<CourseManagement />} />
          <Route path="/document-verification" element={<DocumentVerification />} />
          <Route path="/payment-processing" element={<PaymentProcessing />} />
          <Route path="/register-page" element={<RegisterPage />} />

          {/* Admission Steps */}
          
          <Route path="/photo-upload" element={<PhotoSignUpload />} />
          <Route path="/course-selection" element={<ProgramSelection />} />
          <Route path="/exam-center-selection" element={<CenterSelection />} />
          <Route path="/exam-fee-payment" element={<ExamFeePayment />} />
          
         
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/exam-details" element={<ExamDetails/>} />
          <Route path="/AdminExamManagement" element={<AdminExamManagement/>} />

          {/* Redirect all unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

// ✅ Protected Route (Prevents access to Admin Dashboard without login)
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default App;
