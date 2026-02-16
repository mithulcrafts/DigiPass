import { useState } from "react"; //For doing animations
import { motion } from "framer-motion"; //For using components for titles
import "./styles/Login.css";
import { loginUser } from "../services/authServices";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import SplitText from "../components/SplitText";
import BlurText from "../components/BlurText";
import Logo from "../assets/Images/LogoRemovedbg.png";
import Title from "../assets/Images/Title.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    //e=>event
    e.preventDefault(); //we are telling browser not to perform any default actions like reloading, so that data won't get reset
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("Token", data.accessToken); //Set jwt token in localstorage
      alert("Login successful");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  //To do step by step animation
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [startBlur, setStartBlur] = useState(false);

  return (
    <div className="login-page">
      <div className="login-card">
        <SplitText
          text="Welcome !!"
          className="text-2xl font-medium text-gray-900"
          delay={50}
          duration={1.5}
          splitType="chars"
          from={{ opacity: 0, y: 32 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="center"
          onLetterAnimationComplete={() => {
            setShowLogo(true);
          }}
        />

        <div className="logo-slot">
          {showLogo && (
            <motion.img
              src={Logo}
              alt="Logo"
              className="login-logo"
              initial={{ opacity: 0, scale: 0.8, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onAnimationComplete={() => {
                setShowTitle(true);
              }}
            />
          )}
        </div>

        <div className="title-slot">
          {showTitle && (
            <motion.img
              src={Title}
              alt="Title"
              className="login-title"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onAnimationComplete={() => {
                setStartBlur(true);
              }}
            />
          )}
        </div>

        <BlurText
          text="Login to continue"
          delay={180}
          animateBy="words"
          direction="top"
          start={startBlur}
          className="text-2xl font-medium text-gray-900 mb-8"
        />

        <form onSubmit={handleLogin}>
          <FormInput
            type="email"
            id="loginID"
            name="loginID"
            placeholder="ID"
            onChange={(e) => setEmail(e.target.value)} //We are saying whenever there is some event e and there is change, then we are asking to change it
          />
          <FormInput
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button id="LoginButton" content="Login"/>
        </form>
      </div>
    </div>
  );
}
