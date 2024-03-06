import express from "express";
import bodyParser from "body-parser";
import { users, posts } from "./data1.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// 1. API endpoint to get user information by ID
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  // Find the user with the specified ID
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

//2. API endpoint to create a new user
app.post("/users", (req, res) => {
  const { userName, email, age, avatar } = req.body;

  // Check if email already exists
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Create a new user
  const newUser = {
    id: uuidv4(),
    userName,
    email,
    age,
    avatar,
  };

  // Add the new user to the users array
  users.push(newUser);

  res.status(201).json(newUser);
});

// 3. API endpoint to get user's post by userId
app.get("/users/:id/posts", (req, res) => {
  const id = req.params.id;

  // Find the user with the specified ID
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userPosts = posts.filter((post) => post.userId === id);

  res.json(userPosts);
});

// 4. API endpoint to create a new post for a user
app.post("/users/:id/posts", (req, res) => {
  const userId = req.params.id;
  const { content, isPublic } = req.body;

  // Find the user with the specified ID
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Create a new post
  const newPost = {
    userId,
    postId: uuidv4(),
    content,
    createdAt: new Date().toISOString(),
    isPublic,
  };

  // Add the new post to the posts array
  posts.push(newPost);

  res.status(201).json(newPost);
});

// 5. API endpoint to update a post by postId (only allowed for the post creator)
app.put("/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  const { content, isPublic } = req.body;

  // Find the post with the specified ID
  const postIndex = posts.findIndex((post) => post.postId === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  const existingPost = posts[postIndex];

  // Check if the user updating the post is the post creator
  const user = users.find((u) => u.id === existingPost.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.id !== existingPost.userId) {
    return res.status(403).json({ error: "Permission denied" });
  }

  // Update the post
  const updatedPost = {
    ...existingPost,
    content: content || existingPost.content,
    isPublic: isPublic !== undefined ? isPublic : existingPost.isPublic,
  };

  // Update the post in the posts array
  posts[postIndex] = updatedPost;

  res.json(updatedPost);
});

// 6. API endpoint to delete a post by postId (only allowed for the post creator)
app.delete("/posts/:postId", (req, res) => {
  const postId = req.params.postId;

  // Find the post with the specified ID
  const postIndex = posts.findIndex((post) => post.postId === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  const existingPost = posts[postIndex];

  // Check if the user deleting the post is the post creator
  const user = users.find((u) => u.id === existingPost.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.id !== existingPost.userId) {
    return res.status(403).json({ error: "Permission denied" });
  }

  // Remove the post from the posts array
  posts.splice(postIndex, 1);

  res.json({ message: "Post deleted successfully" });
});

// 7. API endpoint to search posts by content
app.get("/posts/search", (req, res) => {
  const searchContent = req.query.content;

  if (!searchContent) {
    return res.status(400).json({ error: "Content parameter is required" });
  }

  // Filter posts that contain the specified content
  const matchingPosts = posts.filter((post) =>
    post.content.includes(searchContent)
  );

  res.json(matchingPosts);
});

// 8. API endpoint to get all public posts
app.get("/posts/public", (req, res) => {
  // Filter posts where isPublic is true
  const publicPosts = posts.filter((post) => post.isPublic);

  res.json(publicPosts);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
