const router = require('express').Router();
const passport = require('passport')

// Main login page - can add other servises than Google+
router.get('/login', (req, res)=>{
    res.render('login')
})

// auth logout
router.get('/logout',(req, res)=>{
    // handled with passport
    res.send('logging out')
})

// auth Google
router.get('/google',passport.authenticate('google',{
    scope: ['profile','email']
}))

router.get('/google/redirect',passport.authenticate('google'), (req, res)=>{
    res.send('you reached the callback URL')
})

module.exports = router;