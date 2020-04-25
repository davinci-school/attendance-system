const router = require('express').Router();

router.get('/', (req, res)=>{
    if (req.user.ac_type=='user') {
        console.log('user redirect ' + req.user.ac_type)
        res.sendFile('index.html', {root: './../user-page/user_homepage/'})
    } else {
        console.log(req.user.ac_type)
        res.sendFile('index.html', {root: './../admin-page/'})
    }
})

module.exports = router;