import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true } // Ensures cookies are sent if needed
      );

      sessionStorage.setItem("token", response.data.token); // Store securely
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-80">
      <div className="flex">
        <button className="w-1/2 py-2 bg-gray-400">Login</button>
        <Link to="/signup" className="w-1/2 py-2 bg-pink-300 text-center">
          Sign Up
        </Link>
      </div>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full mt-4 p-2 border border-gray-300 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 p-2 border border-gray-300 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <p className="text-red-500 text-sm text-right mt-2 cursor-pointer">
          Forgot my password?
        </p>

        <button
          type="submit"
          className="mt-4 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-900"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;