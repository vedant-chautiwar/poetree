import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/login", form);
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  return (
    <main className="auth-page">
      <form onSubmit={submit} className="auth-card fade-up space-y-4">
        <div>
          <p className="section-kicker">Welcome back</p>
          <h1 className="mt-1 text-3xl font-black text-[#26312c]">Log in to POETREE</h1>
          <p className="mt-2 text-sm leading-6 text-[#69746d]">Return to your feed, comments, and saved poetic circles.</p>
        </div>

        <input
          type="email"
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
          Login
        </button>
        <p className="text-center text-sm font-medium text-[#69746d]">
          Don't have an account?{" "}
          <Link to="/signup" className="font-extrabold text-[#bd6546] hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
