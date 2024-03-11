const UserModel = require("./UserModel"); // Import the Model

exports.registerUser = async (req, res) => {
  try {
    const { userName } = req.body;
    const newUser = await UserModel.createUser(userName);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
