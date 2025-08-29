// src/pages/Login.js
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNotification } from "../context/NotificationProvider";

export default function Login() {
  const notification = useNotification();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [err, setErr] = useState();

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      if (res?.status == 200) {
        dispatch(addUser(res?.data));
        navigate("/profile/feed");
        notification.success(res?.data?.message || "Login successful");
      }
    } catch (err) {
      notification.error(err?.response?.data || "Login failed");
      setErr(err?.response?.data || "Login failed");
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

          {/* <button
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

          <div className="text-center text-sm text-gray-500">OR</div> */}

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
