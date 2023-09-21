// import files
import Card from "./CardModel.js";
import User from "../user/UserModel.js";

//! create new card
export const createCard = async (
  cardNumber,
  cardTitle,
  cardDescription,
  cardDesign,
  spendingLimit,
  selectedCard,
  user
) => {
  const userId = await User.findOne(user.email);
  const newCard = await Card.create({
    cardNumber,
    cardTitle,
    cardDescription,
    cardDesign,
    spendingLimit,
    selectedCard,
  });
  await User.findByIdAndUpdate(
    userId._id,
    {
      $push: {
        cards: newCard,
      },
    },
    {
      safe: true,
      upsert: true,
    }
  );
  return newCard;
};
