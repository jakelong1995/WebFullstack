import UserModel from "../models/UserModel.js";

const registerUser = async (req, res) => {
  try {
    const { userName } = req.body;
    const newUser = await UserModel.createUser(userName);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default registerUser;
