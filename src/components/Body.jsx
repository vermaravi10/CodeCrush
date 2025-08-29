import React, { useEffect } from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationProvider";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user?.data);
  const notification = useNotification();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });

      if (res?.status == 200) {
        dispatch(addUser(res?.data));
        notification.success(res?.data?.message || "User fetched successfully");
      }
    } catch (err) {
      if (err?.status === 401) {
        navigate("/login");
        notification.error("Please login to continue");
      } else {
        navigate("/login");
        notification.error(err?.response?.data || "Failed to fetch user");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
