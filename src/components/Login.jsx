// src/pages/Login.js
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [err, setErr] = useState();
  console.log("🚀 ~ Login ~ err:", err);
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      navigate("/profile/feed");
    } catch (err) {
      const code = err.code?.split("/")[1] || "unknown-error";
      console.log("🚀 ~ loginHandler ~ code:", code);

      const errorMessages = {
        "invalid-email": "Invalid email address.",
        "email-already-in-use": "Email already registered.",
        "weak-password": "password should be at least 6 characters.",
        "user-not-found": "No account found for this email.",
        "invalid-credential": "Incorrect password.",
        "popup-closed-by-user": "Login popup was closed.",
        "network-request-failed": "Network error. Check your connection.",
        "missing-password": "Please enter a password.",
      };

      const message = errorMessages[code] || "Something went wrong!";
      setErr(message);
    }
  };

  return (
    <div className="flex min-h-screen bg-base-100 text-white">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24">
        <div className="max-w-md w-full space-y-6">
          <div>
            <h2 className="text-3xl font-semibold">Log in</h2>
          </div>

          <button
            // onClick={googleLogin}
            className="w-full flex items-center justify-center border border-gray-700 rounded-md py-2 hover:bg-gray-900"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="G"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          <div className="text-center text-sm text-gray-500">OR</div>

          <div className="space-y-4">
            <input
              className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              placeholder="password"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
            />
            {typeof err === "string" && err && (
              <span className="text-red-500 text-sm">{err}</span>
            )}
            <button
              onClick={loginHandler}
              className="w-full bg-white text-black font-semibold py-2 rounded-md hover:opacity-90 transition"
            >
              Log in
            </button>
          </div>

          <div className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Create your account
            </a>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-1/2 min-h-screen items-center justify-center bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-content mb-6 drop-shadow-lg">
            Where pull requests meet heart requests
          </h2>
          <p className="text-xl text-primary-content/90 mb-8 max-w-2xl mx-auto">
            Find your perfect coding partner and collaborate on amazing
            projects. Join the community now!
          </p>
        </div>
      </div>
    </div>
  );
}
