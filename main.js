import mongoose from "mongoose";
// Connection string
const uri =
  "mongodb+srv://hoanglong2579:Nhu6s5MmnrMMtNTI@cluster0.djglaud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB using Mongoose
mongoose.connect(uri);

// Get the default connection
const db = mongoose.connection;

// Event handlers for the connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  // You can perform database operations here

  // Close the connection when you're done
});
