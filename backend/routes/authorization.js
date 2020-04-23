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
    req.logout();
    res.redirect('/');   
})

// auth Google
router.get('/google',passport.authenticate('google',{
    scope: ['profile','email']
}))

router.get('/google/redirect',passport.authenticate(
    'google', {failureRedirect: '/auth/login/'}), (req,res)=> {
        res.redirect('/profile/')
})

module.exports = router;