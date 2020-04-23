const router = require('express').Router();
//const passport = require('passport');

const authCheck = (req, res, next) => {
    console.log('req.user '+ req.user)
    if (!req.user){
       res.redirect('/auth/login') 
    } else {
        next()
    }
}

router.get('/',authCheck, (req, res)=>{
    if (req.user.ac_type='user') {
        res.sendFile('index.html', {root: './../user-page/user_homepage/'})
    } else {
        res.sendFile('index.html', {root: './../admin-page/'})
    }
})

module.exports = router;