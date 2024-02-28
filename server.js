const express = require("express");
const usersData = require("./data"); // Import danh sách users từ file data.js

const app = express();
const port = 3001; // Chọn một cổng tùy ý, ví dụ: 3000

// Định nghĩa endpoint để lấy danh sách users
app.get("/users", (req, res) => {
  res.json(usersData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
