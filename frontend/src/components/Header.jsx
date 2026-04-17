import "./styles/Header.css";
import { useState } from "react";
import Logo from "../assets/Images/LogoRemovedbg.png";
import Title from "../assets/Images/Title.png";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authServices";

export default function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  function redirect() {
    navigate(`/${role}/Dashboard`);
  }
  const handleLogout = async() => {
    await logout();
    navigate("/");
    alert("Successfully Signed Out");
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="header">
        <div className="logo" onClick={redirect}>
          <img src={Logo} alt="Logo" className="symbol" />
          <img src={Title} alt="Title" className="title" />
        </div>
        {open && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "3vw",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "10vw",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              zIndex:2,
            }}
          >
            <div style={{ cursor: "pointer", padding: "8px" }}>Profile</div>
            <div
              style={{ cursor: "pointer", padding: "8px" }}
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
        <div className="profile" onClick={() => setOpen(!open)}>
          <CgProfile className="profileIcon" />
          <IoMdArrowDropdown className="arrow" />
        </div>
      </div>
    </>
  );
}
