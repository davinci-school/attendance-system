// http://www.passportjs.org/
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const connection = require('../database/sql-db')


passport.serializeUser((user, done)=>{
    console.log('user.id' + user.id)
    done(null,user.id)
})

passport.deserializeUser((id, done)=>{
    // find user by id and return account type
    connection.query('SELECT * FROM users WHERE id = ?', [id])
        .then(result => {
            done(null,result[0])
        })
})

passport.use(
    new GoogleStrategy({
    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done)=> {
    // passport callabck function - check if user exist in database
    connection.query('SELECT * FROM users WHERE Email = ?', [profile.emails[0].value])
        .then(result => {
            if (result.length > 0) { // SQL query return a match
                // user found store user to cookies
                console.log(result[0])
                done(null,result[0])
            } else {
                // user not found - failureRedirect at /google/redirect/ back to login  
                console.log('user not found')
                done(null, false)
            }
        })
        .catch(err => console.log(err))
 })
)