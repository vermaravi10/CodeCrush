// hooks/useLogout.js
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/slices/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNotification } from "../context/NotificationProvider";
import { clearFeed } from "../utils/slices/feedSlice";
import { clearConnections } from "../utils/slices/connectionSlice";

export function useLogout() {
  const notification = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeUser());
        dispatch(clearFeed());
        dispatch(clearConnections());
        navigate("/login");
      }
    } catch (err) {
      notification.error(err?.response?.data || "Logout failed");
    }
  };

  return handleLogout;
}
