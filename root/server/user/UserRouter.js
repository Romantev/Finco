// import methods
import { Router } from "express";
// import files
import User from "./UserModel.js";
import { authenticateToken, generateAccessToken } from "./AuthToken.js";

export const userRouter = Router();

//! get all user
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).send("error in finding users");
  }
});

//! get one user
userRouter.get("/secure/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email });
    res.send(user.cards);
  } catch (error) {
    res.status(400).send("error in finding one user");
  }
});

//! create new user
userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = new User({ name, email });
    user.setPassword(password);
    user = await user.save();
    res.send({ message: "new user created", data: user });
  } catch (error) {
    res.status(400).send("error in creating new user");
  }
});

//! login user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+hash").select("+salt");
    const passwordIsValid = user.verifyPassword(password);
    if (passwordIsValid) {
      const token = generateAccessToken({ email });
      res.cookie("auth", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 4 });
      res.send({ message: "Success", data: user });
    } else {
      res.status(404).send({
        message: "Failed to login",
        error: {
          message: "Password and E-Mail combination is wrong",
        },
      });
    }
  } catch (error) {
    res.status(400).send("error in login");
  }
});

//! logout user
userRouter.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.send("OK");
});

//! secure
userRouter.get("/secure", authenticateToken, async (req, res) => {
  res.send({ email: req.userEmail });
});
