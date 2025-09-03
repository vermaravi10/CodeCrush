// ConnectionRequestsPage.jsx
import axios from "axios";
import ProfileCard from "./ProfileCard";
import { BASE_URL } from "../utils/constants";
import { useNotification } from "../context/NotificationProvider";
import { useDispatch, useSelector } from "react-redux";
import { removeRequests, setRequests } from "../utils/slices/requestSlice";
import { useEffect } from "react";

export default function ConnectionRequestsPage() {
  const dispatch = useDispatch();
  const notification = useNotification();
  const requests = useSelector((s) => s?.request);
  console.log("🚀 ~ ConnectionRequestsPage ~ requests:", requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      if (res?.status == 200) {
        notification.success(
          res?.data?.message || "Connection requests fetched successfully"
        );
        dispatch(setRequests(res?.data?.data));
      }
    } catch (error) {
      notification.error(
        error?.response?.data || "Failed to fetch connection requests"
      );
    }
  };

  const handleReview = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + `request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log("🚀 ~ handleReview ~ res:", res);
      if (res?.status == 200) {
        dispatch(removeRequests(requestId));
        notification.success(
          res?.data?.message || `Request${status} successfully`
        );
      }
    } catch (error) {
      notification.error(
        error?.response?.data ||
          `Failed to ${status == "accepted" ? "accept" : "reject"} request`
      );
    }
  };

  useEffect(() => {
    if (!requests) {
      fetchRequests();
    }
  }, []);

  const count = requests?.length ?? 0;

  return (
    <section className="min-h-screen flex flex-col max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Connection Requests</h1>
        <p className="text-sm text-base-content/60">
          {count} pending {count === 1 ? "request" : "requests"}
        </p>
      </header>

      {/* Empty state */}
      {!count ? (
        <div className=" flex items-center justify-center">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
            <h2 className="text-lg font-medium">You’re all caught up 🎉</h2>
            <p className="text-sm text-base-content/60">
              New connection requests will appear here.
            </p>
          </div>
        </div>
      ) : (
        // Responsive grid
        <div className=" flex justify-center  gap-10">
          {requests?.map((u) => (
            <ProfileCard
              key={u?._id || `${u?.firstName}-${u?.lastName}`}
              requestId={u?._id}
              user={u?.fromUserId}
              variant="small"
              requestPage={true}
              handleReview={handleReview}
            />
          ))}
        </div>
      )}
    </section>
  );
}
