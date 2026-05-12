import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/signup", form);
    localStorage.setItem("token", data.token);
    navigate("/login");
  };

  return (
    <main className="auth-page">
      <form onSubmit={submit} className="auth-card fade-up space-y-4">
        <div>
          <p className="section-kicker">Join the grove</p>
          <h1 className="mt-1 text-3xl font-black text-[#26312c]">Create your account</h1>
          <p className="mt-2 text-sm leading-6 text-[#69746d]">Build a home for your poems and follow writers you love.</p>
        </div>

        <input
          className="form-field"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="form-field"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="form-field"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" className="primary-button w-full">
          Signup
        </button>
        <p className="text-center text-sm font-medium text-[#69746d]">
          Already have an account?{" "}
          <Link className="font-extrabold text-[#bd6546] hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
