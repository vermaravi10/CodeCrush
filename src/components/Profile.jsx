// Profile.jsx
import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileCard from "./ProfileCard";
import { BASE_URL } from "../utils/constants";

import { useNotification } from "../context/NotificationProvider";
import axios from "axios";
import { addUser } from "../utils/slices/userSlice";

export default function Profile() {
  const notification = useNotification();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user?.data);
  const [editing, setEditing] = useState(false);
  const [about, setAbout] = useState("");
  const [skillsText, setSkillsText] = useState("");
  const [photo_url, setphoto_url] = useState("");

  const startEdit = () => {
    setAbout(user?.about ?? "");
    setSkillsText(Array.isArray(user?.skills) ? user.skills.join(", ") : "");
    setphoto_url(user?.photo_url ?? "");
    setEditing(true);
  };

  const previewUser = useMemo(() => {
    const skills =
      skillsText
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) ?? [];
    return {
      ...user,
      about,
      photo_url: photo_url,
      skills,
    };
  }, [user, about, photo_url, skillsText]);

  const handleSave = async () => {
    if (!photo_url || photo_url.trim() === "") {
      alert("Photo URL is required.");
      return;
    }
    try {
      const skillsArray = skillsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await axios.patch(
        BASE_URL + "profile/edit",
        { about, photo_url, skills: skillsArray },
        { withCredentials: true }
      );
      if (res?.status === 200) {
        notification.success(
          res?.data?.message || "Profile updated successfully"
        );
        dispatch(addUser(res?.data));
        setEditing(false);
      }
    } catch (err) {
      notification.error(err?.response?.data || "Failed to save profile");
    }
  };

  const handleCancel = () => setEditing(false);

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-base-content/70">Loading profile…</div>
      </div>
    );
  }

  return (
    <>
      {!editing ? (
        // Centered view
        <div className="min-h-screen grid place-items-center p-4">
          <div className="flex flex-col items-center gap-4">
            <ProfileCard user={user} />
            <button className="btn btn-primary w-full" onClick={startEdit}>
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        // Edit view: left form, right live preview
        <div className="min-h-screen p-4 md:p-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Left: form */}
            <div className="card bg-base-100 border border-base-300 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Edit Profile</h2>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      Photo URL <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="url"
                    placeholder="https://example.com/me.jpg"
                    className="input input-bordered w-full"
                    value={photo_url}
                    required
                    onChange={(e) => setphoto_url(e.target.value)}
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full min-h-[120px]"
                    placeholder="Tell others about you…"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Skills (comma-separated)</span>
                  </div>
                  <input
                    type="text"
                    placeholder="React, Node, Postgres"
                    className="input input-bordered w-full"
                    value={skillsText}
                    onChange={(e) => setSkillsText(e.target.value)}
                  />
                </label>

                <div className="mt-4 flex gap-2">
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn btn-ghost" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Right: live preview */}
            <div className="flex items-start md:justify-center">
              <ProfileCard user={previewUser} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
