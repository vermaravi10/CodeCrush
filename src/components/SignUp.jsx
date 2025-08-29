// src/pages/Signup.js
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import dataValidation from "../utils/validations";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNotification } from "../context/NotificationProvider";

export default function Signup() {
  const notification = useNotification();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [age, setAge] = useState();
  const [about, setAbout] = useState("");

  const [skills, setSkills] = useState([]);
  const [photo_url, setPhoto_url] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState();

  const handleSignup = async () => {
    if (!agree) {
      setErr("Please accept the terms and privacy policy.");
      return;
    }
    try {
      const data = {
        firstName,
        lastName,
        emailId,
        password,
        age,
        about,
        skills,
        photo_url,
      };
      dataValidation(data);
      const res = await axios.post(
        "http://localhost:7777/signup",
        { data },
        { withCredentials: true }
      );
      if (res?.status === 200) {
        dispatch(addUser(res?.data));
        navigate("/profile/feed");
        notification.success(res?.data?.message || "Signup successful");
      }
    } catch (err) {
      notification.error(err.message || "Signup failed");
      setErr(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-base-100 text-white">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-semibold">Create your account</h2>

          {/* <button
            // onClick={googleSignup}
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
            <label className="block text-gray-300 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              placeholder="Please enter your First Name"
              type="text"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="block text-gray-300 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              placeholder="Please enter your Last Name"
              type="text"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="block text-gray-300 mb-1">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              className=" input validator w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              type="number"
              required
              placeholder="Enter Your Age"
              min="18"
              max="50"
              title="age"
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setAge(value ? parseInt(value, 10) : "");
              }}
            />
            {/* <label className="block text-gray-300 mb-1">About</label>
            <input
              className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              placeholder="Please enter about yourself"
              type="text"
              onChange={(e) => setAbout(e.target.value)}
            /> */}
            {/* <label className="block text-gray-300 mb-1">Skills</label>
            <input
              className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              placeholder="Please enter your skills"
              type="text"
              onChange={(e) => setSkills(e.target.value)}
            /> */}
            <label className="block text-gray-300 mb-1">
              Photo URL <span className="text-red-500">*</span>
            </label>
            <input
              required
              className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              placeholder="Enter your photo url"
              type="text"
              onChange={(e) => setPhoto_url(e.target.value)}
            />
            <label className="block text-gray-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              required
              className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              placeholder="Please enter your email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block text-gray-300 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              required
              className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-600"
              placeholder=" Please enter your password"
              type="password"
              onChange={(e) => setPass(e.target.value)}
            />
            <div className="flex items-start space-x-2 text-sm text-gray-400">
              <input
                type="checkbox"
                className="mt-1"
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>
                I agree to our{" "}
                <a href="#" className="text-blue-400 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-400 underline">
                  Privacy Policy
                </a>
              </span>
            </div>
            {typeof err === "string" && err && (
              <span className="text-red-500 text-sm">{err}</span>
            )}
            <button
              onClick={handleSignup}
              className="w-full bg-white text-black font-semibold py-2 rounded-md hover:opacity-90 transition"
            >
              Create your account
            </button>
          </div>

          <div className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Log in
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
