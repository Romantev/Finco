// import files
import Card from "./CardModel.js";

//! create new card
export const createCard = async (
  cardNumber,
  cardTitle,
  cardDescription,
  cardDesign,
  spendingLimit,
  selectedCard
) => {
  const newCard = await Card.create({
    cardNumber,
    cardTitle,
    cardDescription,
    cardDesign,
    spendingLimit,
    selectedCard,
  });
};
