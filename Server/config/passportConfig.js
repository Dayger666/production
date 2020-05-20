const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

let User = mongoose.model('User');

passport.use(new LocalStrategy({ usernameField: 'login' }, (login, password, done) => {
        User.findOne({ 'login': login },
            (err, user) => {
                if (err) return done(err);
                // unknown user
                else if (!user) return done(null, false, { message: 'Login is not registered' });
                // wrong password
                else if (!user.verifyPassword(password)) return done(null, false, { message: 'Wrong password.' });
                // authentication succeeded
                else return done(null, user);
            });
    })
);