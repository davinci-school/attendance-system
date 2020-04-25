// Node.js + Express backend ...
const Promise = require("promise");
const express = require("express");
cookieSession = require('cookie-session')
const app = express();
const path = require('path');
const https = require('https');
const authRoutes = require('./routes/authorization')
const profileRoutes = require('./routes/profile')
const apiRoutes = require('./routes/api')
const passportSetup = require('./config/passport-setup')
const connection = require('./database/sql-db')
const passport = require('passport')
const keys = require('./config/keys')

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());


//app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.redirect('/profile/')
})

// set up Routes
app.use('/auth',authRoutes);
app.use('/api',apiRoutes);
app.use('/profile',profileRoutes,express.static(path.join(__dirname, '../user-page/user_homepage')));
app.use('/profile',profileRoutes,express.static(path.join(__dirname, '../admin-page')));

app.listen(3000, function() {
    console.log("Connected to server, port 3000")
});