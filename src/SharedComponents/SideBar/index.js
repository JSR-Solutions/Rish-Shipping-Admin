import React from "react";
import logo from "../../Assets/logo.svg";
import "./Sidebar.css";
import { HiMenu, HiOutlineTicket } from "react-icons/hi";
import { AiOutlineHome, AiOutlineForm } from "react-icons/ai";
import { RiShipLine, RiLogoutCircleLine } from "react-icons/ri";
import { MdShareLocation } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

const SideBar = () => {
  const navigate = useNavigate();

  const useActive = (pathName) => {
    const match = useMatch(pathName);
    return match && pathName === match.pathname;
  };

  const logOut = () => {
    reactLocalStorage.remove("rish-admin-token");
    navigate("/login");
  };

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
        <Link className="sidebar-link" to={"/"}>
          <div className={`sidebar-menu-item ${useActive("/") && "active"}`}>
            <AiOutlineHome className="sidebar-menu-item-icon" />
            <p>Home</p>
          </div>
        </Link>
        <Link className="sidebar-link" to={"/shippers"}>
          <div
            className={`sidebar-menu-item ${
              useActive("/shippers") && "active"
            }`}
          >
            <RiShipLine className="sidebar-menu-item-icon" />
            <p>Shippers</p>
          </div>
        </Link>
        <Link className="sidebar-link" to={"/ports"}>
          <div
            className={`sidebar-menu-item ${useActive("/ports") && "active"}`}
          >
            <MdShareLocation className="sidebar-menu-item-icon" />
            <p>Ports</p>
          </div>
        </Link>
        <Link className="sidebar-link" to={"/companies"}>
          <div
            className={`sidebar-menu-item ${
              useActive("/companies") && "active"
            }`}
          >
            <CgOrganisation className="sidebar-menu-item-icon" />
            <p>Companies</p>
          </div>
        </Link>
        <Link className="sidebar-link" to={"/bookings"}>
          <div
            className={`sidebar-menu-item ${
              useActive("/bookings") && "active"
            }`}
          >
            <HiOutlineTicket className="sidebar-menu-item-icon" />
            <p>Bookings</p>
          </div>
        </Link>
        <Link className="sidebar-link" to={"/forms"}>
          <div
            className={`sidebar-menu-item ${
              useActive("/forms") && "active"
            }`}
          >
            <AiOutlineForm className="sidebar-menu-item-icon" />
            <p>Forms</p>
          </div>
        </Link>
        <hr />
        <div onClick={logOut} className="sidebar-menu-item">
          <RiLogoutCircleLine className="sidebar-menu-item-icon" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
