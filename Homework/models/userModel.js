import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


// Create and export the User model
const User = mongoose.model("User", userSchema);

export default User;