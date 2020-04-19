var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var User = require('../models/user');
var bcrypt = require('bcryptjs');
var ObjectId = require('mongodb').ObjectId;

const isValidPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
}

passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (req, id, done) {
    req.db
       .collection('users')
       .findOne(ObjectId(id))
       .then((user) => done(null, user));
});

passport.use('login', new LocalStrategy(
    {
        passReqToCallback: true,
    },
    async function (req, username, password, done) {
        // User.getUserByUsername(username, function (err, user) {
        //     // if server returns error message, then provide passport error info
        //     if (err) return done(err);
        //     // if user cannot be found in database, also not provide user info
        //     if (!user) return done(null, false, { message: 'User not found' });
        //     // if found, but password cannot match, then reject
        //     if (!isValidPassword(user, password)) return done(null, false, { message: 'Incorrect password' });

        //     return done(null, user);
        // });
        const user  = await req.db.collection('users').findOne({username});
        
        if (!user) return done(null, false, { reason: 'User not found' });
        if (!isValidPassword(user, password)) return done(null, false, { reason: 'Incorrect password' });

        return done(null, user);
    }
));
passport.use('signup', new LocalStrategy(
    {
        passReqToCallback: true
    },
    async function (req, username, password, done) {
        if(!username || !password)
            return done(null, false, { reason: 'Missing Field(s)' });
        if(await req.db.collection('users').countDocuments({ username }) > 0)
            return done(null, false, { reason: 'The username have been used' });
            
        const hashedPasswd = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        const user = await req.db
                              .collection('users')
                              .insertOne({ username, password: hashedPasswd })
                              .then(({ ops }) => ops[0]);
        return done(null, user);
    }
));



module.exports = passport;