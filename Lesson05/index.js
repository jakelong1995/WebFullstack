import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;
const uri = `mongodb+srv://${process.env.MONGODB_DB_NAME}:${process.env.MONGODB_PWD}@cluster0.djglaud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());
app.use("/api", router);

mongoose
  .connect(uri)
  .then(() => console.log("Connected to database successfully"))
  .catch((error) => console.error("Database connection failed", error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 1. Viết API việc đăng ký user với userName, id sẽ được là một string ngẫu nhiên, không được phép trùng, bắt đầu từ ký tự US (ví dụ: US8823).
// 2. Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
// 3. Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
// 4. Viết API cho phép user được comment vào bài post
// 5. Viết API cho phép user chỉnh sửa comment (chỉ user tạo comment mới được sửa)
// 6. Viết API lấy tất cả comment của một bài post.
// 7. Viết API lấy tất cả các bài post, 3 comment đầu (dựa theo index) của tất cả user .
// 8. Viết API lấy một bài post và tất cả comment của bài post đó thông qua postId
