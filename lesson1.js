const express = require("express");
const usersData = require("./data");
const { v4: uuidv4 } = require("uuid");
const faker = require("faker");
const fs = require("fs");

const app = express();
const port = 3000;

// 1. Endpoint to get the list of users
app.get("/users", (req, res) => {
  res.json(usersData);
});

// 2. Endpoint to get the list of users with age >= 50
app.get("/users/old", (req, res) => {
  const oldUsers = usersData.filter((user) => user.age >= 50);
  res.json(oldUsers);
});

// 3. Endpoint to add a new user with random information
app.get("/users/add-random", (req, res) => {
  const newUser = {
    id: uuidv4(), // Generate a random id using uuid
    userName: generateRandomName(),
    email: generateRandomEmail(),
    address: generateRandomAddress(),
    age: generateRandomAge(),
  };

  usersData.push(newUser);

  res.json(newUser);
});

// 4. Endpoint to add a new user with information provided through query parameters
app.get("/users/add", (req, res) => {
  // Extract user information from query parameters
  const { userName, email, address, age } = req.query;

  // Validate required parameters
  if (!userName || !email || !address || !age) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // Create a new user object
  const newUser = {
    id: uuidv4(),
    userName: userName,
    email: email,
    address: address,
    age: parseInt(age),
  };

  res.json(newUser);
});

// 5. Endpoint to update user information based on user ID and field-value pairs using GET method
app.get("/users/update/:id", (req, res) => {
  const userId = req.params.id;

  // Find the user by ID
  const userToUpdate = usersData.find((user) => user.id == userId);

  // Check if the user with the specified ID exists
  if (!userToUpdate) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update fields based on query parameters
  for (const key in req.query) {
    if (key !== "id") {
      userToUpdate[key] = req.query[key];
    }
  }

  // Write the updated data back to data.js
  fs.writeFileSync(
    "./data.js",
    "export default " + JSON.stringify(usersData, null, 2),
    "utf-8"
  );

  res.json(userToUpdate);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function generateRandomName() {
  return faker.name.findName(); // Uses faker.js to generate a realistic name
}

function generateRandomEmail() {
  return faker.internet.email(); // Uses faker.js to generate a realistic email
}

function generateRandomAddress() {
  return faker.address.streetAddress() + ", " + faker.address.city(); // Uses faker.js to generate a realistic address
}

function generateRandomAge() {
  // Logic to generate a random age between, for example, 18 and 80
  return Math.floor(Math.random() * (80 - 18 + 1) + 18);
}
