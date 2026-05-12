import React, { useEffect, useState } from "react";
import API from "../api/axios";
import PoemCard from "../components/PoemCard";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    const id = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;

    API.get(`/users/${id}`).then((res) => {
      setUser(res.data.user);
      setPoems(res.data.poems);
    });
  }, []);

  if (!user) {
    return <div className="page-shell text-center font-bold text-[#69746d]">Loading profile...</div>;
  }

  return (
    <main className="page-shell">
      <section className="soft-card fade-up p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="profile-avatar">{user.username?.charAt(0)?.toUpperCase() || "P"}</div>
            <div className="min-w-0">
              <p className="section-kicker">Profile</p>
              <h2 className="truncate text-3xl font-black text-[#26312c]">{user.username}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:min-w-52">
            <div className="stat-tile">
              <p className="text-2xl font-black text-[#24493d]">{user.followers.length || 0}</p>
              <p className="text-sm font-bold text-[#69746d]">Followers</p>
            </div>
            <div className="stat-tile">
              <p className="text-2xl font-black text-[#24493d]">{poems.length}</p>
              <p className="text-sm font-bold text-[#69746d]">Poems</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4">
          <p className="section-kicker">Library</p>
          <h3 className="text-xl font-extrabold text-[#26312c]">Your poems</h3>
        </div>

        <div className="stagger-list space-y-4">
          {poems.length === 0 ? (
            <div className="soft-card p-6 text-center text-[#69746d]">
              Your profile is ready for its first poem.
            </div>
          ) : (
            poems.map((p) => <PoemCard key={p._id} poem={p} />)
          )}
        </div>
      </section>
    </main>
  );
}
