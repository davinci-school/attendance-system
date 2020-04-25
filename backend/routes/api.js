const router = require('express').Router();
const connection = require('../database/sql-db')

router.get('/user_data_past_month', (req, res) => {
    console.log("user_data_past_month")
    connection.query(`
        SELECT u.username, t.time_in, t.time_out 
        FROM users u 
        JOIN time_board t 
        ON u.id = t.id_user 
        WHERE t.id_user=?  
        AND time_in BETWEEN SUBDATE(CURDATE(), INTERVAL 1 MONTH) AND NOW() 
        ORDER BY t.time_in DESC`,
        [req.user.id])
        .then(results => {
            res.send(results)
            //res.send(results.name, results.time_in, results.time_out)
        })
        .catch(error => console.log(error))

});

module.exports = router;