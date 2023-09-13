import "./SignUp.css";
// import methods
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
// import components
import HeaderSetup from "../../components/Header/HeaderSetup";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [checkbox, setCheckbox] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setPasswordErrorMessage(false);
  }, [password, passwordConfirmation]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkbox) {
      if (password === passwordConfirmation) {
        const reqBody = {
          name: username,
          email,
          password,
        };

        try {
          const response = await axios.post("/api/users/signup", reqBody);
          navigate("/first-login");
        } catch (error) {
          console.log("Failed SignUP: ", error);
        }
      } else {
        setPasswordErrorMessage(true);
      }
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <>
      <HeaderSetup />
      <main className="signup-wrapper">
        <article className="signup-heading">
          <h1>
            SignUp to <span>Finco</span>
          </h1>
          <h2>Income & Expense Tracking</h2>
        </article>
        <form className="signup-form" onSubmit={handleSubmit}>
          <section>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="login-input"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="login-input"
              required
            />
            <h3>Secure your profile</h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="login-input"
              minLength="8"
              required
            />
            <input
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              type="password"
              placeholder="Confirm password"
              className="login-input"
              minLength="8"
              required
            />
          </section>
          <div className={errorMessage ? "agb-error" : "agb"}>
            <input
              type="checkbox"
              onChange={() => setCheckbox((prev) => !prev)}
            />
            <label>Agree to our Terms and Service</label>
            {passwordErrorMessage && (
              <p className="error-password">
                Your password & confirm password don't match
              </p>
            )}
          </div>
          <button className="blueBtn" type="submit">
            Sign Up
          </button>
        </form>
        <div className="dontHaveAccount-link">
          <p>All ready have any account?</p>
          <NavLink className="signUp-link" to="/login">
            Login
          </NavLink>
        </div>
      </main>
    </>
  );
};

export default SignUp;
