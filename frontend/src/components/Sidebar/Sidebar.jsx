import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/admin/add" className="sidebar-option">
          <i className="bi bi-plus-circle-fill"></i>
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/admin/list" className="sidebar-option">
          <i className="bi bi-list-task"></i>
          <p>List Items</p>
        </NavLink>
        <NavLink to="/admin/orders" className="sidebar-option">
          <i className="bi bi-journal-text"></i>
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
