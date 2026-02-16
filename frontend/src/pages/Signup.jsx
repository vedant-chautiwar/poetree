import React from 'react'
import { useState } from 'react';
import API from "../api/axios"
import { useNavigate, Link } from "react-router-dom"

export default function Signup () {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();
    const submit = async(e)=>{
        e.preventDefault();
        const {data} = await API.post("/auth/signup", form);
        localStorage.setItem("token", data.token);
        navigate("/login");
    }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <form onSubmit={submit} className='bg-white p-6 rounded-2xl shadow w-80 space-y-3'>
            <h1 className='text-xl font-bold'>Signup</h1>

            <input className="border p-2 w-full rounded" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <input className="border p-2 w-full rounded" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" className="border p-2 w-full rounded" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button className='bg-black text-white w-full py-2 rounded hover:bg-gray-700'>Signup</button>
            <Link className="text-sm text-blue-500" to="/login">Already have account?</Link>
        </form>
    </div>
  )
}
