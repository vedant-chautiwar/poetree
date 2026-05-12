import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";

function Private({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const showNavbar = localStorage.getItem("token") && !isAuthPage;

  return (
    <div className="app-shell">
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Private><Home /></Private>} />
        <Route path="/discover" element={<Private><Discover /></Private>} />
        <Route path="/profile" element={<Private><Profile /></Private>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
