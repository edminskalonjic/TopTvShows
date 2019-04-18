 const passport = require('passport');
 const requireLogin= require('../middlewares/requireLogin');

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile', 'email']
    }));
 
    app.get('/auth/google/callback', passport.authenticate('google'), (req,resp)=>{
        resp.redirect('/tvshows');
    });

    app.get('/auth/current_user', (req,resp)=>{
        resp.send(req.user ? true : false);
    });  

    app.get('/auth/logout', requireLogin, (req,resp) => {
        req.logout();
        resp.redirect('/landing');
    });
 }

 