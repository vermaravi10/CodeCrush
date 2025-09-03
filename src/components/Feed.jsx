import React, { use, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "../context/NotificationProvider";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { setFeed } from "../utils/slices/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const notification = useNotification();
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed?.data);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });

      if (res?.status == 200) {
        notification.success(res?.data?.message);
        dispatch(setFeed(res?.data));
      }
    } catch (err) {
      notification.error(err?.response?.data || "Failed to load feed");
    }
  };

  const handleInterested = async (user) => {
    // Implement the logic to handle interest (like)
    try {
      const res = await axios.post(
        BASE_URL + `request/send/interested/${user._id}`,
        {},
        { withCredentials: true }
      );

      if (res?.status == 201) {
        console.log("🚀 ~ handleInterested ~ res:", res);
        notification.success(res?.data?.message || "Marked as interested");
        fetchFeed();
      }
    } catch (err) {
      notification.error(err?.response?.data || "Failed to mark as interested");
    }
  };

  const handleIgnore = async (user) => {
    try {
      const res = await axios.post(
        BASE_URL + `request/send/ignored/${user._id}`,
        {},
        { withCredentials: true }
      );
      if (res?.status === 201) {
        notification.success(res?.data?.message || "Marked as Ignored");
        fetchFeed();
      }
    } catch (err) {
      notification.error(err?.response?.data || "Failed to mark as Ignored");
    }
  };

  useEffect(() => {
    if (!feed) {
      fetchFeed();
    }
  }, []);
  return (
    <div
      className=" flex justify-center items-center"
      style={{ height: "calc(100vh - 132px)" }}
    >
      <FeedCard
        feedData={feed}
        onIgnored={handleIgnore}
        onInterested={handleInterested}
      />
    </div>
  );
};

export default Feed;
