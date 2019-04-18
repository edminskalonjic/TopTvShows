const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id).then(user =>{
        done(null, user);
    });
})

passport.use(new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL:'/auth/google/callback'
},async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({googleID:profile.id});
    if(user){
        done(null, user);
    }else{
        const user = await new User({googleID:profile.id}).save();
        done(null,user);
    }
}));
