import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <nav className="site-nav px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <h1 className="brand-mark">POETREE</h1>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/discover" className={navClass}>
            Discover
          </NavLink>
          <NavLink to="/profile" className={navClass}>
            Profile
          </NavLink>
          <button onClick={logout} className="nav-button">
            Logout
          </button>
        </div>

        <button
          className="mobile-menu-button md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className={open ? "menu-icon is-open" : "menu-icon"} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {open && (
        <div className="mobile-nav flex flex-col gap-2 md:hidden fade-up">
          <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/discover" className={navClass} onClick={() => setOpen(false)}>
            Discover
          </NavLink>
          <NavLink to="/profile" className={navClass} onClick={() => setOpen(false)}>
            Profile
          </NavLink>
          <button onClick={logout} className="nav-button text-left">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
