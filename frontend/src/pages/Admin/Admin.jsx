import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "../Add/Add";
import List from "../List/List";
import Orders from "../Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css"; // ✅ make sure this line is present

const Admin = () => {
  return (
    <div className="admin">
      <ToastContainer />
      <h2>Welcome, Admin</h2>
      <div className="admin-layout">
        <Sidebar />
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
