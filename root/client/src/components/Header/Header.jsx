import "./Header.css";

// import methods
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// import img
import BackIcon from "../../icon/Back-icon.png";
import logo from "../../icon/Logo.png";
import profile from "../../icon/default-profile.png";
import creditCard from "../../icon/credit-card.png";
import { useContext, useEffect, useState } from "react";

// import context
import { CurrendUserContext, SelectedCardContext } from "../../context/context";

const Header = ({
  searchIsActive,
  setSearchIsActive,
  goBack,
  welcome,
  setup,
}) => {
  const { selectedCard, setSelectedCard } = useContext(SelectedCardContext);
  const { _, setCurrentUser } = useContext(CurrendUserContext);

  const [openCardBox, setOpenCardBox] = useState(false);

  const [findedCard, setFindedCard] = useState({});

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedName, setSelectedName] = useState("Name");

  const Navigate = useNavigate();

  useEffect(() => {
    let currentUser;
    let cardsId;
    let cards = [];

    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get("/api/users/secure");
        currentUser = data.email;
        setCurrentUser(data.email);
      } catch (error) {
        console.log("get user error", error);
      }
      fetchCardsId();
    };

    const fetchCardsId = async () => {
      try {
        const { data } = await axios.get(`/api/users/secure/${currentUser}`);
        cardsId = data;
      } catch (error) {
        console.log("get cardsId error", error);
      }
      fetchCards();
    };

    const fetchCards = async () => {
      const cardObjId = true;
      try {
        const cardArrayPromises = await cardsId.map((id) => {
          return axios.get(`/api/cards/${id}/${cardObjId}`);
        });
        const cardArrayResponse = await Promise.all(cardArrayPromises);
      } catch (error) {
        console.log("get cards error", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const navigateBack = () => {
    Navigate(-1);
  };

  return (
    <header className="transactionHeader">
      {/* LOGO */}
      {searchIsActive ? (
        <button className="goBackBtn" onClick={() => setSearchIsActive(false)}>
          <img src={BackIcon} alt="back icon" />
        </button>
      ) : goBack ? (
        <button className="goBackBtn" onClick={navigateBack}>
          <img src={BackIcon} alt="back" />
        </button>
      ) : welcome ? (
        <div>
          <h5 className="heading">Welcome Back</h5>
          <h2>{selectedName}</h2>
        </div>
      ) : setup ? (
        <img className="headerLogo" src={logo} alt="logo" />
      ) : (
        <NavLink to={"/"}>
          <img className="headerLogo" src={logo} alt="logo" />
        </NavLink>
      )}

      {/* CARD */}
      {setup ? null : (
        <>
          <div className="card-profile">
            <div className="card-btn">
              <button
                onClick={() => setOpenCardBox((prev) => !prev)}
                className="btn-hidden">
                <img
                  className="creditCard-icon"
                  src={creditCard}
                  alt="credit card logo"
                />
                {/* OpenCard Box */}
                {openCardBox && (
                  <>
                    <div className="header-overlay"></div>
                    <div className="cardBox">
                      {cards?.map((card) => (
                        <div className="navCard-list" key={card.cardNumber}>
                          <div
                            className="icon-creditCard"
                            onClick={(e) =>
                              handleSelectCard(e, card.cardNumber)
                            }>
                            <img
                              className="creditCard-mini"
                              src={creditCard}
                              alt="credit-card"
                            />
                            <p>{card.cardTitle}</p>
                          </div>
                          <div className="navCard-separator"></div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </button>
              <p>{findedCard.cardTitle}</p>
            </div>

            {/* PROFILE */}
            <NavLink className="profile-img" to={"/account"}>
              {selectedProfile ? (
                <img src="" alt="profile-img" className="selectedProfile-img" />
              ) : (
                <img
                  className="defaultProfile-img"
                  src={profile}
                  alt="default-profile-img"
                />
              )}
            </NavLink>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
