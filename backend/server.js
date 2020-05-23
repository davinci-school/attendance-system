// importing existing librarires
const express = require("express");
const cookieSession = require('cookie-session')
const path = require('path');
const https = require('https');
// importing the server files
const authRoutes = require('./routes/authentication')
const profileRoutes = require('./routes/profile')
const apiRoutes = require('./routes/api')
const passportSetup = require('./config/passport-setup')
const connection = require('./database/sql-db')
const passport = require('passport')
const keys = require('./config/keys')

// Creating and setting new  Express application
const app = express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true })) // used for passing date in API

// Check if user logged in based on existence of request.user
const authCheck = (req, res, next) => {
    console.log('authCheck - ' + req.user)
    if (!req.user) {
        res.redirect('/auth/login')
    } else {
        next()
    }
}

// set up Routes
app.get('/', (req, res) => {
    res.redirect('/profile/')
})
app.use('/auth', authRoutes);
app.use('/profile', authCheck, profileRoutes, express.static(path.join(__dirname, '../frontend/home')));
app.use('/api', authCheck, apiRoutes);

app.listen(3000, function() {
    console.log("Connected to server, port 3000")
});