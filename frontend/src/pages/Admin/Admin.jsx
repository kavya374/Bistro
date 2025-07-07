import React from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import Add from "../Add/Add";
import List from "../List/List";
import Orders from "../Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="admin">
      <ToastContainer />

      {/* Navbar at the top */}
      <nav className="admin-navbar">
        <div className="logo">Bistro Admin</div>
        <div className="nav-links">
          <NavLink
            to="add"
            className={({ isActive }) => isActive ? "active link" : "link"}
          >
            Add
          </NavLink>
          <NavLink
            to="list"
            className={({ isActive }) => isActive ? "active link" : "link"}
          >
            List
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) => isActive ? "active link" : "link"}
          >
            Orders
          </NavLink>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="admin-layout">
        <div className="admin-content">
          <Routes>
            <Route path="add" element={<Add />} />
            <Route path="list" element={<List />} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
