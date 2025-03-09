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
    </div>
  );
}

export default Home;
