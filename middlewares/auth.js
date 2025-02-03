// middlewares/authenticateSession.js
const authenticateSession = (req, res, next) => {
    if (req.session.userId) {
      // If the user is logged in and trying to access login or signup page, redirect to dashboard
      if (req.originalUrl === '/login' || req.originalUrl === '/signup') {
        return res.redirect('/dashboard/folders');
      }
      // If user is logged in and accessing the dashboard, proceed to the next middleware or route handler
      return next();
    }
  
    // If the user is not logged in and trying to access dashboard, redirect to login page
    if (req.originalUrl === '/dashboard/folders') {
      return res.redirect('/login');
    }
    // If the user is not logged in and trying to access dashboard, redirect to login page
    if (req.originalUrl === '/dashboard') {
      return res.redirect('/dashboard/folders');
    }
  
    // Proceed to the next middleware if it's neither login/signup nor dashboard
    return next();
  };
  
  module.exports = authenticateSession;
  