const router = require('express').Router();
const connection = require('../database/sql-db')

const adminCheck = (req, res, next) => {
    console.log('adminCheck - '+ req.user.ac_type)
    if (req.user.ac_type !='admin') {
       res.redirect('/auth/login') 
    } else {
        next()
    }
}

// GET: /user_data_past_month
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
router.post('/user_check_out', (req, res)=> {
    console.log('api/user_check_out')
        // Check if user already checked-in today longerr than 3 minutes 
        // and chekout is NULL THEN set check-out time
    connection.query(`
        SELECT t.id_user, t.time_in 
        FROM time_board t 
        WHERE t.id_user = ? 
        AND time_in < (NOW() - INTERVAL 0.1 MINUTE)
        AND time_out IS NULL`,
        [req.user.id])
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

//GET: /admin_data/YYYY-MMM-DD
/* Order the people with following rules 
First people already present (time_is=Value, time_out=NULL)
Second people that didnt sign in yet (time_is=NULL, time_out=NULL)
Third people who already left (time_is=Value, time_out=Value)
*/
router.get('/admin_data/:date',adminCheck, (req, res) => {
    console.log("api/admin_data/"+ req.params.date)
    connection.query(`
        SELECT s.username, s.time_in, s.time_out, s.id
            FROM (SELECT u.username, t.time_in, t.time_out, u.id
                    FROM users u 
                    JOIN time_board t 
                    ON u.id = t.id_user 
                    WHERE (CAST(t.time_in as DATE) = ? 
                    AND t.time_out IS null) 
                    ORDER BY u.username LIMIT 200) s
        UNION
        SELECT s2.username, s2.time_in, s2.time_out, s2.id
            FROM (SELECT DISTINCT u2.username, null AS time_in, NULL AS time_out, u2.id
                    FROM users u2 
                    WHERE u2.id 
                    NOT IN (SELECT u1.id 
                                FROM users u1 
                                JOIN time_board t2 
                                ON u1.id = t2.id_user 
                                WHERE (CAST(t2.time_in as DATE) = ?)) 
                                ORDER BY u2.username LIMIT 200) s2
        UNION
        SELECT s1.username, s1.time_in, s1.time_out, s1.id
            FROM (SELECT u3.username, t3.time_in, t3.time_out, u3.id
                    FROM users u3 
                    JOIN time_board t3 
                    ON u3.id = t3.id_user 
                    WHERE (CAST(t3.time_in as DATE) = ? 
                    AND t3.time_out IS not null) 
                    ORDER BY u3.username LIMIT 200) s1`,
        [req.params.date,req.params.date,req.params.date])
        .then(results => {
            res.send(results)
            //res.send(results.name, results.time_in, results.time_out, results.id_user )
        })
        .catch(error => console.log(error))

})

// POST: /admin_edit
/*
recieve data in JSON
{ username: Jmeno, 
  date: YYYY-MM-DD,
  time_in: HH:MM:SS,
  time_out: NULL
}
1) record may not have been created yet
2) if record exist than update time_in and time_out
3) deltet record if both time_in=time_out=Null
*/
router.post('/admin_edit', (req, res)=> {
    console.log('Got body:', req.body.username);
    connection.query(`CALL Admin_update_time_board(?, ?, ?, ?)`,
    [req.body.id_user, req.body.date, req.body.time_in, req.body.time_out])
    .then(result => {
        console.log(result)
        res.sendStatus(200);
    })
    .catch(error => res.sendStatus(403))  
})

module.exports = router;