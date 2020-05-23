// http://www.passportjs.org/
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const connection = require('../database/sql-db')


passport.serializeUser((user, done)=>{
    console.log('user.id' + user.id_user)
    done(null,user.id_user)
})

passport.deserializeUser((id_user, done)=>{
    // find user by id and return account type
    connection.query('SELECT * FROM users WHERE id_user = ?', [id_user])
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
    connection.query('SELECT * FROM users WHERE email = ?', [profile.emails[0].value])
        .then(result => {
            if (result.length > 0) { // SQL query return a match
                // user found store user to cookies
                console.log('user found' + result)
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