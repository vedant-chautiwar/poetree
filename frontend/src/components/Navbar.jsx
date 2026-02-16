import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'

export default function Navbar () {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const userId = localStorage.getItem("userId");
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    }
    return (
        <nav className="bg-black text-white px-4 py-3 mt-2 mx-auto w-5/6 rounded-3xl">
            <div className="flex justify-between items-center">
                <h1 className="font bold text-3xl font-extrabold">
                    Poetree
                </h1>
                <div className="hidden md:flex gap-5 items-center">
                    <Link to="/" className="font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-gray-800 p-3 transition-all duration-200">Home</Link>
                    <Link to="/discover" className="font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-gray-800 p-3 transition-all duration-200">Discover</Link>
                    <Link to={"/profile"} className="font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-gray-800 p-3 transition-all duration-200">Profile</Link>
                    <button onClick={logout} className="font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-gray-800 p-3 transition-all duration-200">Logout</button>
                </div>
                <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
                    ☰
                </button>
            </div>
            {open && (
                <div className="flex flex-col justify-center items-center gap-3 mt-4 md:hidden">
                    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/discover" onClick={() => setOpen(false)}>Discover</Link>
                    <Link to={"/profile"} onClick={() => setOpen(false)}>Profile</Link>
                    <button onClick={logout} className="bg-white text-black px-3 py-1 rounded-lg w-fit">Logout</button>
                </div>
            )}
        </nav>
    )
}
