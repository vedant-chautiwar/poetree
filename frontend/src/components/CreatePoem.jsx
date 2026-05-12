import React, { useState } from "react";
import API from "../api/axios";

export default function CreatePoem({ open, setOpen, refresh }) {
  const [form, setForm] = useState({ title: "", content: "" });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/poems", form);
    setForm({ title: "", content: "" });
    setOpen(false);
    refresh();
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <form onSubmit={submit} className="soft-card fade-up w-full max-w-lg space-y-4 p-5">
        <div>
          <p className="section-kicker">New poem</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#26312c]">Share a fresh line</h2>
        </div>

        <input
          type="text"
          className="form-field"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="form-field min-h-40 resize-y"
          placeholder="Write your poem..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => setOpen(false)} className="secondary-button">
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
