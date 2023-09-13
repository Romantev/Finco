// import files
import "./config/index.js";
import { userRouter } from "./user/UserRouter.js";
import { cardRouter } from "./card/CardRouter.js";
import { transactionRouter } from "./transaction/TransactionRouter.js";
// import methods
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;
const ReactAppDisPath = path.join(path.resolve(), "..", "client", "dist");
const ReactAppIndex = path.join(
  path.resolve(),
  "..",
  "client",
  "dist",
  "index.html"
);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(ReactAppDisPath));

//! test
app.get("/api/status", (req, res) => {
  res.send({ status: "OK" });
});

//! UserRouter
app.use("/api/users", userRouter);

//! CardRouter
app.use("/api/cards", cardRouter);

//! TransactionRouter
app.use("/api/transactions", transactionRouter);

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
