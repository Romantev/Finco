import "./Home.css";
// import methods
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import components
import Nav from "../../components/Nav/Nav.jsx";
import IncomeExpense from "../../components/IncomeExpense/IncomeExpense";
import Header from "../../components/Header/Header";
import Creditcard from "../../components/Creditcard/Creditcard";
// import context
import {
  OpenBoxContext,
  PageContext,
  SelectedCardContext,
} from "../../context/context";
// import img
import DangerIcon from "../../icon/icon-danger.svg";
import ThreeDot from "../../icon/threedot-icon.svg";

const Home = () => {
  const [userAcc, setUserAcc] = useState();
  const { selectedCard, setSelectedCard } = useContext(SelectedCardContext);
  const { page, setPage } = useContext(PageContext);
  const { setOpenBox } = useContext(OpenBoxContext);

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [limit, setLimit] = useState(0);
  const [editLimit, setEditLimit] = useState(false);
  const [cards, setCards] = useState([]);

  const handleEditLimit = () => {
    setEditLimit(true);
  };

  //! set spendingLimit on card
  const handleSaveLimit = async (e) => {
    e.preventDefault();
    const newLimit = { value: limit };
    await axios.put(
      `/api/cards/${selectedCard}/update/spendingLimit`,
      newLimit
    );
    setEditLimit(false);
  };

  const fetchData = async () => {
    try {
      const reqBody = {
        selectedCard: selectedCard,
      };

      const { data } = await axios.post(`/api/transactions`, reqBody);
      const sortedData = data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setTransactions(sortedData);
      handleDataforGraph(data);
    } catch (error) {
      console.log({ fetchData: error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPage("Home");
    setOpenBox(false);

    //! fetch spendingLimit
    const fetchLimit = async () => {
      try {
        const card = await axios.get(`/api/cards/${selectedCard}`);
        setLimit(card.data.spendingLimit);
      } catch (error) {
        console.log("fetch limit: ", error);
      }
    };
    fetchLimit();

    //! fetch transactions
    const fetchTransactions = async () => {
      try {
        await getCards();
        cards?.map((card) => {
          if (card.cardNumber == selectedCard) {
            setTransactions(card.transactions);
          }
        });
      } catch (error) {
        console.log("fetch transactions: ", error);
      }
    };
    fetchTransactions();
    let incomeAmount = 0;
    let expenseAmount = 0;

    setIncome(incomeAmount);
    setExpenses(expenseAmount);
  }, []);

  return (
    <>
      <Header welcome={true} />

      {selectedCard && <Creditcard />}

      <div className="wallet">
        <h3>Total Wallet</h3>
      </div>
      <article className="income-expense">
        <IncomeExpense sortAmount={"income"} transaction={transactions} />
        <IncomeExpense sortAmount={"expense"} transaction={transactions} />
      </article>
      <article className="monthly-spending">
        <div className="danger-icon">
          <img src={DangerIcon} alt="" />
        </div>
        <div className="limit">
          <p>Spending limit</p>
          {editLimit ? (
            <input
              className="setLimit-input"
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            />
          ) : (
            <h3>{limit} €</h3>
          )}
        </div>
        {editLimit ? (
          <div className="editLimit-btn">
            <button className="save-button" onClick={handleSaveLimit}>
              Save
            </button>
            <button
              className="limitReset-btn"
              onClick={() => setEditLimit(false)}>
              X
            </button>
          </div>
        ) : (
          <img
            src={ThreeDot}
            alt=""
            onClick={handleEditLimit}
            className="edit-icon"
          />
        )}
      </article>
      <Nav page={page} />
    </>
  );
};

export default Home;
