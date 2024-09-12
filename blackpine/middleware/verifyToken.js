const {expressjwt} = require('express-jwt')



const verifyToken = expressjwt({secret: process.env.BLACKPINE_SECRET, algorithms: ['HS256']})

const checkAdminRole = async (req, res, next) => {
    try {
      // Extract the user ID from the token
      const userId = req.user.id;
      if (!userId) return res.status(403).send('Access denied.');
  
      // Fetch the user from the database
      const user = await User.findById(userId);
      if (!user) return res.status(404).send('User not found.');
  
      // Check if the user has an admin role
      if (user.role !== 'admin') {
        return res.status(403).send('Access denied. Admins only.');
      }
  
      // Attach the user to the request object if needed
      req.user = user;
  
      next(); // Pass control to the next middleware
    } catch (err) {
      next(err); // Handle any errors
    }
  };

module.exports = {verifyToken, checkAdminRole}