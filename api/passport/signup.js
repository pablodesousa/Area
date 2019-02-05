var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = function(passport){
    passport.use('signup', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            findOrCreateUser = function(){
                User.findOne({ 'username' :  username }, async function(err, user) {
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        try  {
                            await newUser.save();
                            var token = jwt.sign({ id: newUser._id }, 'test', {
                                expiresIn: 86400 // expires in 24 hours
                            });
                        }
                        catch (error) {
                            console.log('Error in SignUp: '+error);
                            return done(error);
                        }
                        req.token = token;
                        return done(null, newUser);
                    }
                });
            };
            process.nextTick(findOrCreateUser);
        })
    );
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

};