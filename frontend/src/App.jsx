import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";


function Private({ children }) {
return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}


export default function App() {
return (
<BrowserRouter>
{localStorage.getItem("token") && <Navbar />}


<Routes>
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />


<Route path="/" element={<Private><Home /></Private>} />
<Route path="/discover" element={<Private><Discover /></Private>} />
<Route path="/profile" element={<Private><Profile /></Private>} />
</Routes>
</BrowserRouter>
);
}