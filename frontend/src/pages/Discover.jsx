import React, { useState } from "react";
import API from "../api/axios";

export default function Discover() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState(new Set());

  const search = async (v) => {
    setQ(v);
    if (!v.trim()) {
      setUsers([]);
      return;
    }
    const res = await API.get(`/users/search/${v}`);
    setUsers(res.data);
  };

  const follow = async (id) => {
    await API.post(`/users/follow/${id}`);
    setFollowingIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <main className="wide-shell">
      <section className="soft-card fade-up p-5 sm:p-6">
        <p className="section-kicker">Discover</p>
        <h2 className="mt-1 text-3xl font-black text-[#26312c]">Find poets to follow</h2>
        <p className="mt-2 max-w-2xl leading-7 text-[#69746d]">
          Search for writers, follow their work, and keep your feed full of voices you want to return to.
        </p>
        <input
          type="text"
          placeholder="Search users..."
          className="form-field mt-5"
          value={q}
          onChange={(e) => search(e.target.value)}
        />
      </section>

      <section className="mt-5">
        {q.trim() && users.length === 0 ? (
          <div className="soft-card fade-up p-6 text-center text-[#69746d]">
            No poets found for "{q}".
          </div>
        ) : !q.trim() ? (
          <div className="soft-card fade-up p-6 text-center text-[#69746d]">
            Start typing a username to discover new poets.
          </div>
        ) : (
          <div className="stagger-list grid gap-3 sm:grid-cols-2">
            {users.map((u) => (
              <div className="soft-card flex items-center justify-between gap-3 p-4" key={u._id}>
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#dce9df] font-extrabold text-[#24493d]">
                    {u.username?.charAt(0)?.toUpperCase() || "P"}
                  </div>
                  <p className="truncate font-extrabold text-[#26312c]">{u.username}</p>
                </div>
                <button
                  onClick={() => follow(u._id)}
                  className={followingIds.has(u._id) ? "following-button shrink-0" : "secondary-button shrink-0"}
                >
                  {followingIds.has(u._id) ? "Following" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
