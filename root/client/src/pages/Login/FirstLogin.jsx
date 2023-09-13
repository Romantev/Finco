import "./FirstLogin.css";
// import methods
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import components
import HeaderSetup from "../../components/Header/HeaderSetup";

const FirstLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      email,
      password,
    };

    try {
      const login = await axios.post("/api/users/login", reqBody);

      navigate("/account-setup");
    } catch (error) {
      console.log("Error on first login:", error);
    }
  };

  useEffect(() => {
    try {
      setEmail(location.state.email);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <HeaderSetup />
      <main className="firstLogin-main">
        <h1>Login</h1>
        <h3>Put your password for your first login</h3>
        <h4>{email}</h4>

        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <button className="blueBtn" type="submit">
            Login
          </button>
        </form>
      </main>
    </>
  );
};

export default FirstLogin;
