// import methods
import { Router } from "express";
// import files
import { createTransaction } from "./TransactionController.js";
import Transaction from "./TransactionModel.js";

export const transactionRouter = Router();

//! get all transactions
transactionRouter.get("/", async (req, res) => {
  const { category, date, selectedCard } = req.query;
  let transactions = await Transaction.find();

  try {
    // find card
    if (selectedCard) {
      transactions = transactions.filter((transaction) => {
        return transaction.cardId === selectedCard;
      });
      // get transactions by category
      if (category) {
        transactions = transactions.filter((transaction) => {
          return transaction.category
            .toLowerCase()
            .includes(category.toLowerCase());
        });
        // get transactions by date
      } else if (date) {
        transactions = transactions.filter((transaction) => {
          return transaction.date === date;
        });
      }
    }
    res.json(transactions);
  } catch (error) {
    res.status(400).send("error in finding all transactions");
  }
});

//! get transaction by id
transactionRouter.get("/:id", async (req, res) => {
  const transId = req.params.id;
  try {
    const transaction = await Transaction.findOne({ cardId: transId });
    res.json(transaction);
  } catch (error) {
    res.status(400).send("error in finding transaction by id");
  }
});

//! create new transaction
transactionRouter.post("/newtransaction", async (req, res) => {
  const { cardId, amount, category, transactionType, date, time } = req.body;
  const newTransaction = await createTransaction(
    cardId,
    amount,
    category,
    transactionType,
    date,
    time
  );
  res.json(newTransaction);
});
