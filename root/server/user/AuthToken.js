// import methods
import jwt from "jsonwebtoken";

//! generate token
export const generateAccessToken = (userEmailObj, persist = false) => {
  return jwt.sign(userEmailObj, process.env.TOKEN_SECRET, {
    expiresIn: persist ? "7d" : "4h",
  });
};

//! authenticate token
export function authenticateToken(req, res, next) {
  let token = null;
  if (req?.cookies?.auth) {
    token = req.cookies.auth;
  }
  if (!token) {
    const authHeader = req.headers["authorization"];
    token = authHeader && authHeader.split(" ")[1];
  }

  if (token === null) return res.status(401).send("token is not valide");

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userEmail = user.userEmail;

    next();
  });
}
