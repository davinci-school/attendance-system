const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.user.ac_type == 'admin') {
        res.sendFile('home-admin.html', { root: './../frontend/home/' })
    } else {
        console.log(req.user.ac_type)
        res.sendFile('home-user.html', { root: './../frontend/home/' })
    }
})

module.exports = router;