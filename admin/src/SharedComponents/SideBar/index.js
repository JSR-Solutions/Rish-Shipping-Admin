import React from "react";
import logo from "../../Assets/logo.svg";
import "./Sidebar.css";
import { HiMenu } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { RiShipLine, RiLogoutCircleLine } from "react-icons/ri";
import { MdShareLocation } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";

const SideBar = () => {
  return (
    <div className="sidebar-parent closed">
      <div className="sidebar-action-btn">
        <HiMenu
          onClick={(event) => {
            event.preventDefault();
            const sidebar = document.querySelector(".sidebar-parent");
            sidebar.classList.toggle("expanded");
            sidebar.classList.toggle("closed");
          }}
          className="open-btn"
        />
      </div>
      <div className="sidebar-logo">
        <img src={logo} alt="Rish Shipping" />
        <h1>Rish Shipping</h1>
      </div>
      <div className="sidebar-menu-parent">
        <div className="sidebar-menu-item active">
          <AiOutlineHome className="sidebar-menu-item-icon" />
          <p>Home</p>
        </div>
        <div className="sidebar-menu-item">
          <RiShipLine className="sidebar-menu-item-icon" />
          <p>Shippers</p>
        </div>
        <div className="sidebar-menu-item">
          <MdShareLocation className="sidebar-menu-item-icon" />
          <p>Ports</p>
        </div>
        <div className="sidebar-menu-item">
          <CgOrganisation className="sidebar-menu-item-icon" />
          <p>Companies</p>
        </div>
        <div className="sidebar-menu-item">
          <RiLogoutCircleLine className="sidebar-menu-item-icon" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
