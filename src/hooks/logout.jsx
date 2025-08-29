// hooks/useLogout.js
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/slices/userSlice";
import { BASE_URL } from "../utils/constants";

export function useLogout() {
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
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return handleLogout;
}
