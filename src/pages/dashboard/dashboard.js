import React from "react";
import SideBar from "../../SharedComponents/SideBar";
import Logo from "../../Assets/logo.svg";
import { FiHome } from "react-icons/fi";
import "../../styles/dashboard/dashboard.css";
function dashboard() {
  return (
    <div className="dashboard-main">
      <div className="dashboard-sidebar">
        <SideBar />
      </div>
      <div className="dashboard-content"></div>
    </div>
  );
}

export default dashboard;
