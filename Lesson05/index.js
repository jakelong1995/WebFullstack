import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT || 4001;
const uri = `mongodb+srv://${process.env.MONGODB_DB_NAME}:${process.env.MONGODB_PWD}@cluster0.djglaud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());

mongoose
  .connect(uri)
  .then(() => console.log("Connected to database successfully"))
  .catch((error) => console.error("Database connection failed", error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
