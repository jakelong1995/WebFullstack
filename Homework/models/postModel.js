import mongoose from "mongoose";

// Define the schema for the Post model
const userSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required:true
  }
});


// Create and export the Post model
const Post = mongoose.model("Post", userSchema);

export default Post;