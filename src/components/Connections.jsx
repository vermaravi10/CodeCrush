// src/components/ConnectionsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import { useDispatch } from "react-redux";
import { setConnections } from "../utils/slices/connectionSlice";
import axios from "axios";
import { useNotification } from "../context/NotificationProvider";
import { BASE_URL } from "../utils/constants";

const ConnectionsPage = () => {
  const notification = useNotification();
  // assuming your redux slice looks like: state.connections.list = []
  const connections = useSelector((s) => s.connections?.data || []);
  const [q, setQ] = useState("");
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });

      if (res?.status == 200) {
        dispatch(setConnections(res?.data));
        notification.success(
          res?.data?.message || "Connections fetched successfully"
        );
      }
    } catch (err) {
      notification.error(err?.response?.data || "Failed to fetch connections");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return connections;

    return connections?.filter((u) => {
      const name = String(
        `${u?.firstName ?? ""} ${u?.lastName ?? ""}`
      ).toLowerCase();
      const age = String(u?.age ?? ""); // safe: number/null → string
      const about = String(u?.about ?? "").toLowerCase();
      const skills = Array.isArray(u?.skills)
        ? u.skills.map(String).join(" ").toLowerCase()
        : "";

      return (
        name.includes(needle) ||
        age.includes(needle) ||
        about.includes(needle) ||
        skills.includes(needle)
      );
    });
  }, [q, connections]);

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Connections</h1>
          <label className="w-full sm:w-80">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search by name, role, skill…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
        </div>

        {/* Empty */}
        {filtered?.length === 0 && (
          <div className="grid place-items-center py-16">
            <div className="text-center">
              <div className="text-lg font-medium mb-2">
                No connections found
              </div>
              <p className="text-base-content/70">Try adjusting your search.</p>
            </div>
          </div>
        )}

        {/* Grid (flex, 2 per row) */}
        {filtered?.length > 0 && (
          <div className="flex justify-center  flex-wrap  gap-10">
            {filtered?.map((u, i) => (
              <div
                key={u?._id ?? u?.id ?? i}
                // className="w-full sm:w-1/2 lg:w-1/3"
              >
                <ProfileCard key={u._id} user={u} variant="small" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;
