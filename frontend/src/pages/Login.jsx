import "./styles/Login.css";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome back!</h2>
        <p className="subtitle">Login to continue</p>

        <form>
          <FormInput id="LoginID" name="LoginID" placeholder="ID" />
          <FormInput
            type="password"
            id="Password"
            name="Password"
            placeholder="Password"
          />
          <Button id="LoginButton" content="Login" />
        </form>
      </div>
    </div>
  );
}
