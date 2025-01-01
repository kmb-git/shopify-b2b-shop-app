function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
      return next(); // User is authenticated, proceed to the next middleware or route
    }
    res.redirect("/signin"); // Redirect to the signin page if not authenticated
  }
  
  module.exports = ensureAuthenticated;