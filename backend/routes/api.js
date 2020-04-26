const router = require('express').Router();
const connection = require('../database/sql-db')

router.get('/user_data_past_month', (req, res) => {
    console.log("api/user_data_past_month")
    connection.query(`
        SELECT u.username, t.time_in, t.time_out 
        FROM users u 
        JOIN time_board t 
        ON u.id = t.id_user 
        WHERE t.id_user=?  
        AND time_in BETWEEN SUBDATE(CURDATE(), INTERVAL 1 MONTH) AND NOW() 
        ORDER BY t.time_in DESC`, [req.user.id])
        .then(results => {
            res.send(results)
                //res.send(results.name, results.time_in, results.time_out)
        })
        .catch(error => console.log(error))

});

//GET: /admin_data/YYYY-MMM-DD
router.get('/admin_data/:date', (req, res) => {
    console.log("api/admin_data/" + req.params.date)
    connection.query(`
        SELECT u.username, t.time_in, t.time_out 
        FROM users u 
        JOIN time_board t 
        ON u.id = t.id_user 
        WHERE cast(time_in as date) = ?
        ORDER BY u.username DESC`, [req.params.date])
        .then(results => {
            res.send(results)
                //res.send(results.name, results.time_in, results.time_out)
        })
        .catch(error => console.log(error))

})

// POST: /user_check_in
router.post('/user_check_in', (req, res) => {
    console.log('api/user_check_in')
        // First check if user already checked-in today if yes send error message 403 forbidden
    connection.query(`
        SELECT t.id_user, t.time_in 
        FROM time_board t 
        WHERE t.id_user = ? 
        AND cast(time_in as DATE) = CURDATE()`, [req.user.id])
        .then(result => {
            if (result.length > 0) {
                console.log('user already logged in' + result)
                res.sendStatus(403)
            } else {
                connection.query(`
                INSERT INTO time_board 
                (id_user,time_in) 
                VALUES (?, CURTIME())`, [req.user.id]).then(res.sendStatus(200))
                    // user has not checked-in, save record to database and send confirmation
            }
        })
})

// POST: /user_check_out
router.post('/user_check_out', (req, res) => {
    console.log('api/user_check_out')
        // Check if user already checked-in today longerr than 3 minutes 
        // and chekout is NULL THEN set check-out time
    connection.query(`
        SELECT t.id_user, t.time_in 
        FROM time_board t 
        WHERE t.id_user = ? 
        AND time_in < (NOW() - INTERVAL 0.1 MINUTE)
        AND time_out IS NULL`, [req.user.id])
        .then(result => {
            if (result.length > 0) {
                connection.query(`
                UPDATE  time_board 
                SET time_out = CURTIME()
                WHERE id_user = ? 
                AND  cast(time_in as DATE) = CURDATE()`, [req.user.id])
                    .then(res.sendStatus(200))
            } else {
                console.log('user not checked in yet')
                res.sendStatus(403)
            }
        })
})

// POST: /admin_edit
// TBD

module.exports = router;