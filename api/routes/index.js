var express = require('express');
var router = express.Router();

/* GET home page. */


var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/login');
};

module.exports = function(passport){
  /* Handle Login POST */
  router.post('/login',
      passport.authenticate('signup', { failureRedirect: '/KO' }),
      function(req, res) {
        res.json({ 'token' : req.token});
  });

  /* Handle Logout */
  router.post('/signout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  /* Handle Registration POST */
  router.post('/signup',
      passport.authenticate('signup', { failureRedirect: '/KO' }),
      function(req, res) {
        res.json({ 'token' : req.token});
  });
  
  router.get('/KO', function(req,res) {
    return res.json({user : 'KO'});
  });
  return router;
};
