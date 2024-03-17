import express from "express";
import createUser from "../controllers/userController.js";
import { createPost, editPost } from '../controllers/postController.js';

const router = express.Router();

router.post("/users", createUser);

router.post("/posts", createPost);
router.put('/posts/:postId', editPost);

// router.post('/comments', createComment);
// router.put('/comments/:commentId', editComment);
// router.get('/posts/:postId/comments', getAllCommentsOfPost);

export default router;
