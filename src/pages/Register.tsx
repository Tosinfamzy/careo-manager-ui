import { useState } from "react";
import axios from "axios";
import PaintImage from "../assets/paintingImage.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/auth/register`;
      const response = await axios.post(endpoint, {
        email,
        password,
        username,
      });

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      window.location.href = "/tasks";
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
        <h3 className="text-lg mb-6">
          <strong>Sign up to</strong>
          <br /> get things done ✨
        </h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email" className="mb-1 font-medium">
            Enter your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="yours@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <label htmlFor="username" className="mb-1 font-medium">
            Enter your username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="task master"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <label htmlFor="password" className="mb-1 font-medium">
            Enter your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <label htmlFor="confirmPassword" className="mb-1 font-medium">
            Confirm your password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={handleRegister}
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center">
          Already have an Account ?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Login
          </a>
        </p>
      </div>
      <div className="ml-12 hidden md:block">
        <img
          src={PaintImage}
          alt="Illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Register;
