import User from "../models/userModel.js";

const createUser = async (req, res) => {
  try {
     // Parse request body
    const { userName } = req.body;

    // Create a new user instance
    const newUser = new User({
      userId: generateUserId(),
      userName
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({success: true, message: 'User created successfully', User: savedUser});
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Failed to create user', error: error.message });
  }
};

// Function to generate a unique user ID
const generateUserId = () => {
  const randomId = Math.floor(1000 + Math.random()*9000);
  return `US${randomId}`;
}

export default createUser;