var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = function(passport){
    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            User.findOne({ 'username' :  username },
                function(err, user) {
                    if (err)
                        return done(err);
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false);
                    }
                    try  {
                        await user.save();
                        var token = jwt.sign({ id: newUser._id }, 'test', {
                            expiresIn: 86400 // expires in 24 hours
                        });
                    }
                    catch (error) {
                        console.log('Error in SignUp: '+error);
                        return done(error);
                    }
                    req.token = token;
                    return done(null, user);
                }
            );

        })
    );
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

};