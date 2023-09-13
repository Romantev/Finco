// import files
import Card from "./TransactionModel.js";
import Transaction from "./TransactionModel.js";

//! create new transaction
export const createTransaction = async (
  cardId,
  amount,
  category,
  transactionType,
  date,
  time
) => {
  const card = await Card.findOne({ cardNumber: cardId });
  if (!card) throw new Error("no card with this id");

  const newTransaction = await Transaction.create({
    cardId,
    amount,
    category,
    transactionType,
    date,
    time,
  });

  // push transaction to card
  await Card.findByIdAndUpdate(
    card._id,
    {
      $push: {
        transactions: newTransaction,
      },
    },
    {
      safe: true,
      upsert: true,
    }
  );
  return newTransaction;
};
