import "./Login.css";
// import methods
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import components
import HeaderSetup from "../../components/Header/HeaderSetup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      email,
      password,
    };

    try {
      const login = await axios.post("/api/users/login", reqBody);
      navigate("/home");
    } catch (error) {
      console.log("Error at Login", error);
    }
  };

  const handleForgotPasswort = async () => {};

  return (
    <>
      <HeaderSetup />
      <main className="login-main">
        <div className="login-header">
          <h1>Welcome back</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <section>
            <input
              value={email}
              type="email"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <input
              value={password}
              type="password"
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <div onClick={handleForgotPasswort} className="forgotPassword-link">
              Forgot your password?
            </div>
          </section>
          <button type="submit" className="blueBtn">
            Login
          </button>
        </form>
        <div className="dontHaveAccount-link">
          <p>Don´t have any account?</p>
          <NavLink to="/signup" className="signUp-link">
            SignUp
          </NavLink>
        </div>
      </main>
    </>
  );
};

export default Login;
