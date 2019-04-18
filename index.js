const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const keys = require('./config/keys');
const loadData = require('./loadData');
require('./models/User');
require('./services/passport');

const app = express();
loadData();

mongoose.connect(keys.mongoUrl, {useNewUrlParser:true}, err=>{
    if(err){
        console.log(err);
    }
});

app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 *1000,
    keys:[keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/tvShowRoutes')(app);
require('./routes/saveJsonFileRoute')(app);
 
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log('Listening to port 5000');
});