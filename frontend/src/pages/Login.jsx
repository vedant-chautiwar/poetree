import React from 'react'
import API from '../api/axios'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'

export default function Login () {
    const [form, setForm] = useState({email:"", password:""});
    const navigate = useNavigate();
    const submit = async(e)=>{
        e.preventDefault();
        const {data} = await API.post("/auth/login", form);
        localStorage.setItem("token", data.token);
        navigate("/");
    }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <form onSubmit={submit} className='bg-white p-6 rounded-2xl shadow w-80 space-y-3'>
            <h1 className="text-xl font-bold">Login</h1>

            <input type="email" className="border p-2 w-full rounded" placeholder='E-mail' value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
            <input type="password" className="border p-2 w-full rounded" placeholder='Password' value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} />
            <button type='submit' className='bg-black text-white w-full py-2 rounded hover:bg-gray-700'>Login</button>
            <p>Don't have an account? <Link to="/signup" className='text-blue-600 hover:underline'>Sign up</Link></p>
        </form>
    </div>
  )
}
