import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddProduct from "./Pages/AddProduct";
import ListProduct from "./Pages/ListProduct";
import Orders from "./Pages/Orders";
import { useState, useEffect } from "react";
import Login from "./Components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency='$'

function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const navigate = useNavigate();

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("adminToken", newToken);
    navigate("/list"); 
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
    navigate("/"); 
  };

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <>
          <Navbar onLogout={handleLogout} />
          <hr />
          <div className="flex">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
              <Route path="/" element={<Home/>} />
                <Route path="/add" element={<AddProduct token={token} />} />
                <Route path="/list" element={<ListProduct token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
