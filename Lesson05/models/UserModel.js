const mongoose = require("mongoose");
const uniqueRandom = require("unique-random"); // A package to generate unique random numbers
const rand = uniqueRandom(1000, 9999);

const userSchema = new mongoose.Schema({
  id: String,
  userName: String,
});

userSchema.statics.createUser = async function (userName) {
  const existingUser = await this.findOne({ userName });
  if (existingUser) {
    throw new Error("Username already exists");
  }
  const userId = "US" + rand();
  const newUser = new this({ id: userId, userName });
  await newUser.save();
  return newUser;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
