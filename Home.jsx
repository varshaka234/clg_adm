import { Link } from "react-router-dom";
import AdmissionCard from "../components/AdmissionCard";
import LoginForm from "../components/LoginForm";

function Home() {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="flex justify-center items-center h-screen">
        <div className="flex gap-10">
          {/* Admission Card */}
          <AdmissionCard />

          {/* Login Form */}
          <LoginForm />
        </div>
      </div>

      {/* Admin Login Link */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Link to="/admin-login" className="text-lg text-blue-600 font-semibold hover:underline">
          Admin Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
