const router = require('express').Router();
const passport = require('passport')

// Main login page - can add other servises than Google+
router.get('/login', (req, res)=>{
    //res.render('login')
    res.sendFile('login_page.html', {root: './views'})
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
    //res.send(req.user)
    if (req.user.ac_type='user') {
        res.sendFile('index.html', {root: './../user-page/user_homepage/'})
    } else {
        res.sendFile('index.html', {root: './../admin-page/'})
    }
})

module.exports = router;