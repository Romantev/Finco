// import files
import Card from "./CardModel.js";
import User from "../user/UserModel.js";

//! create new card
export const createCard = async (
  cardNumber,
  cardTitle,
  cardDescription,
  cardDesign,
  selected,
  user
) => {
  const userId = await User.findOne(user);
  let newCard;

  if (!selected) {
    newCard = await Card.create({
      cardNumber,
      cardTitle,
      cardDescription,
      cardDesign,
    });
  } else {
    newCard = await Card.create({
      cardNumber,
      cardTitle,
      cardDescription,
      cardDesign,
      selectedCard: true,
    });
  }
  console.log(newCard);

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
