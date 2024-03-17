const authMiddleware = (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
  
    // User is authenticated, proceed to the next middleware or route handler
    next();
  };
  
  export default authMiddleware;