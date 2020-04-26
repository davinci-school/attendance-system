const router = require('express').Router();

router.get('/', (req, res)=>{
    if (req.user.ac_type=='user') {
         res.sendFile('index.html', {root: './../frontend/user/'})
    } else {
        console.log(req.user.ac_type)
        res.sendFile('index.html', {root: './../frontend/admin/'})
    }
})

module.exports = router;