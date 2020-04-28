const router = require('express').Router();

router.get('/', (req, res)=>{
    if (req.user.ac_type=='admin') {
        res.sendFile('index.html', {root: './../frontend/admin/'})
    } else {
        console.log(req.user.ac_type)
        res.sendFile('index.html', {root: './../frontend/user/'})    }
})

module.exports = router;