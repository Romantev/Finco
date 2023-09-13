// import methods
import crypto from "crypto";
import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  salt: {
    type: String,
    required: true,
    select: false,
  },
  hash: {
    type: String,
    required: true,
    select: false,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

UserSchema.methods.setPassword = function (password) {
  // salt
  this.salt = crypto.randomBytes(64).toString("hex");

  // hash
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.verifyPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.hash === hash;
};

export const User = model("User", UserSchema);

export default User;
