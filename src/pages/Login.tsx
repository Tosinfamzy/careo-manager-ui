import { useState } from "react";
import axios from "axios";
import PaintImage from "../assets/paintingImage.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/auth/login`;
      const response = await axios.post(endpoint, { email, password });

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // Redirect to tasks page
      window.location.href = "/tasks";
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome !</h2>
        <h3 className="text-lg mb-6">
          <strong>Sign in to</strong>
          <br /> get things done ✨
        </h3>
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
          <label htmlFor="password" className="mb-1 font-medium">
            Enter your password
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center">
              <input type="checkbox" name="remember-me" className="mr-2" />{" "}
              Remember me
            </label>
            <a
              href="/forgot-password"
              className="text-green-500 hover:underline"
            >
              Forgot Password ?
            </a>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center">
          Don’t have an Account ?{" "}
          <a href="/register" className="text-green-500 hover:underline">
            Register
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

export default Login;
