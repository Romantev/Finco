import "./AccountSetup.css";
// import methods
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import components
import CardDesign from "../../components/CardDesign/CardDesign";
import HeaderSetup from "../../components/Header/HeaderSetup";
// import context
import { PageContext } from "../../context/context";
import { UserContext } from "../../context/UserContext";

const AccountSetup = () => {
  const { page, setPage } = useContext(PageContext);
  const { user } = useContext(UserContext);

  const [cardTitle, setCardTitle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [designColor, setDesignColor] = useState("lightseagreen");
  const [designIndex, setDesignIndex] = useState(0);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reqBody = {
        cardNumber: cardNumber,
        cardTitle: cardTitle,
        cardDescription: cardDescription,
        cardDesign: designColor,
        selected: true,
        user,
      };
      const response = await axios.post(`/api/cards/newcard/`, reqBody);
    } catch (error) {
      console.log("create the first card", error);
    }

    setPage("account-setup");
    navigate("/");
  };

  return (
    <>
      <HeaderSetup />

      <main className="accountSetup-main">
        <h1>Create your first Card</h1>

        <form onSubmit={handleSubmit} className="accountSetup-form">
          <section className="accountSetup-section">
            <input
              className="newCardInput"
              type="text"
              placeholder="Card number"
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <input
              className="newCardInput"
              type="text"
              placeholder="Card title"
              onChange={(e) => setCardTitle(e.target.value)}
              required
            />
            <input
              className="newCardInput"
              type="text"
              placeholder="Card description"
              onChange={(e) => setCardDescription(e.target.value)}
              required
            />
          </section>
          <CardDesign
            setDesignColor={setDesignColor}
            setDesignIndex={setDesignIndex}
            designIndex={designIndex}
          />
          <button className="blueBtn" type="submit">
            Create Card
          </button>
        </form>
      </main>
    </>
  );
};

export default AccountSetup;
