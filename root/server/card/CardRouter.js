// import methods
import { Router } from "express";
// import files
import Card from "./CardModel.js";
import { createCard } from "./CardController.js";

export const cardRouter = Router();

//! get all cards
cardRouter.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.send(cards);
  } catch (error) {
    res.status(400).send("error in finding all cards");
  }
});

//! get one card by id
cardRouter.get("/:id/:objId", async (req, res) => {
  const cardId = req.params.id;
  const objId = req.params.objId;

  if (objId) {
    try {
      const card = await Card.findById(cardId);
      res.json(card);
    } catch (error) {
      console.log("error in finding card by ObjId", error);
    }
  } else {
    try {
      const card = await Card.findOne({ cardNumber: cardId });
      res.json(card);
    } catch (error) {
      res.status(400).send("error in finding card by id");
    }
  }
});

//! create new card
cardRouter.post("/newcard", async (req, res) => {
  const { cardNumber, cardTitle, cardDescription, cardDesign, user, selected } =
    req.body;
  try {
    const newCard = await createCard(
      cardNumber,
      cardTitle,
      cardDescription,
      cardDesign,
      selected,
      user
    );
    res.send(newCard);
  } catch (error) {
    res.status(400).send("error in creating new card");
  }
});

//! delete card
cardRouter.delete("/:id", async (req, res) => {
  const cardId = req.params.id;
  try {
    const dbRes = await Card.findByIdAndDelete(cardId);
    res.send("card deleted");
  } catch (error) {
    res.status(400).send("error in deleting card");
  }
});

//! edit existing card
cardRouter.put("/:id", async (req, res) => {
  const reqEdit = req.body;
  const cardId = req.params.id;
  try {
    const dbRes = await Card.findOneAndUpdate({ cardNumber: cardId }, reqEdit, {
      new: true,
    });
    res.json(dbRes);
  } catch (error) {
    res.status(400).send("error in editing card by id");
  }
});

//! edit all cards
cardRouter.put("/", async (req, res) => {
  const reqEdit = req.body;
  try {
    const dbRes = await Card.updateMany({ selectedCard: true }, reqEdit);
    res.json(dbRes);
  } catch (error) {
    res.status(400).send("error in editing all cards");
  }
});
