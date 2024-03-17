import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = async (req, res) => {
  try {
    // Parse request body
    const {content,authorId} = req.body;

    // Check if the authorId exists in the database
    const existingUser = await User.findOne({ userId: authorId });

    if (!existingUser) {
        return res.status(400).json({ success: false, message: 'User with provided authorId does not exist' });
      }

    // Create a new user instance
    const newPost = new Post({
      postId: generatePostId(),
      content,
      authorId
    });

    // Save the user to the database
    const savedPost = await newPost.save();

    res.status(201).json({success: true, message: 'Post created successfully', Post: savedPost});
  } catch (error) {
    console.error('Error creating new post:', error);
    res.status(500).json({ success: false, message: 'Failed to create new post', error: error.message });
  }
};

// Function to generate a unique post ID
const generatePostId = () => {
  const randomId = Math.floor(1000 + Math.random()*9000);
  return `PS${randomId}`;
}

const editPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const content = req.body
        
        // Find the post in the database
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({ success: false, message: 'Post not found' })
        }
        
        // Update the post content
        post.content = content;

        // Save the updated post to the database
        const updatedPost = await post.save();
        
        res.status(200).json({ success: true, message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ success: false, message: 'Failed to update post', error: error.message });
    }
  };

export {createPost, editPost};
