import "./styles/Header.css";
import Logo from "../assets/Images/LogoRemovedbg.png";
import Title from "../assets/Images/Title.png";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate=useNavigate();
  const role=localStorage.getItem("role");
  function redirect(){
      navigate(`/${role}/Dashboard`);
  }
  return (
    <>
      <div className="header">
        <div className="logo" onClick={redirect}>
          <img src={Logo} alt="Logo" className="symbol" />
          <img src={Title} alt="Title" className="title" />
        </div>
        <CgProfile className="profileIcon"/>
      </div>
    </>
  );
}
