import "./Login.css";
// import methods
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import components
import HeaderSetup from "../../components/Header/HeaderSetup";
// import context
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { refetch, user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cards, setCards] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    // check if user is login
    if (user !== null) {
      const fetchCards = async () => {
        const data = await axios.get(`/api/users/secure/${user.email}`);
        setCards({ data });
      };
      fetchCards();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      email,
      password,
    };

    try {
      const login = await axios.post("/api/users/login", reqBody);
      refetch();
      if (cards.length === 0) {
        nav("/account-setup");
      } else {
        nav("/");
      }
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
          <h1>Welcome to Finco</h1>
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
