// Node.js + Express backend ...
const Promise = require("promise");
const express = require("express");
cookieSession = require('cookie-session')
const app = express();
const path = require('path');
const https = require('https');
const authRoutes = require('./routes/authorization')
const profileRoutes = require('./routes/profile')
const passportSetup = require('./config/passport-setup')
const connection = require('./database/sql-db')
const passport = require('passport')
const keys = require('./config/keys')

app.set('view engine','ejs')

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());


//app.use(express.urlencoded({ extended: true }))

// // Redirect function
// const redirectLogin = (req, res, next) => {
//     console.log("redirectLogin,req.session.userid= " + req.session.userid);
//     if (!req.session.userid) {
//         res.redirect("/Login")
//     } else { next() }
// }

// const redirectHome = (req, res, next) => {
//     console.log("redirectHome,req.session.userid= " + req.session.userid)
//     if (req.session.userid) {
//         res.redirect("/Home")
//     } else { next() }
// }

// Do not move app.use
// Relative path must be specified after the redirect function but before the route
//app.use('/Home', redirectLogin, express.static(path.join(__dirname, '../user-page/user_homepage')))

// const convertSQL = (results) => {
//     return (JSON.parse(JSON.stringify(results[0])))
// }

// const checkUserExist = (results, req, res) => {
//     console.log("checkUserExist")
//     if (results.length > 0) { // SQL query return a match
//         var rows = convertSQL(results)
//         req.session.userid = rows.ID_users; // set session ID to user ID
//         res.redirect('/Home');
//     } else {
//         res.send('Incorrect Username and/or Password!');
//     }

// }

// const checkUserAuthorization = (results, req, res) => {
//     if (results.length > 0) {
//         var rows = convertSQL(results)
//         if (req.session.userid == rows.ID_users) {
//             console.log('user_ID', rows.ID_users);
//             res.send(rows.ID_users.toString());
//             return Promise.resolve(rows.ID_users.toString())
//         } else {
//             res.send('unathorizes access');
//             return Promise.reject('promise rejeted unathorizes access');
//         }
//     } else {
//         res.send('No such a user');
//     }
// }


app.get('/', (req, res) => {
    res.redirect('/profile/')
})




// app.route("/Home")
// .get(redirectLogin, (req, res) => {
//     res.sendFile("index.html")
// })


// app.route("/Login")
// .get(redirectHome, (req, res) => {
//     console.log(req.session)
//     res.send(`
//         <h1>Login page</h1>
//         <form method="post" action="/login">
//             <input type="email" name="email" placeholder="Email" require />
//             <input type="password" name="password" placeholder="Password" require />
//             <input type="submit"/>
//         </form>
//         `)
// })

// .post(redirectHome, (req, res) => {
//     const { email, password } = req.body
//     console.log(email, password)
//     connection.query('SELECT * FROM users WHERE Email = ? AND password = ?', [email, password])
//         .then(results => checkUserExist(results, req, res))
//         .catch(err => console.log(err))
// }) //end of post


// app.get('/user_data_past_month', redirectLogin, (req, res) => {
//     console.log("user_data_past_month")
//     connection.query(`
//         SELECT u.username, t.time_in, t.time_out 
//         FROM users u 
//         JOIN time_board t 
//         ON u.ID_users = t.ID_users 
//         WHERE t.ID_users=?  
//         AND time_in BETWEEN SUBDATE(CURDATE(), INTERVAL 1 MONTH) AND NOW() 
//         ORDER BY t.time_in DESC`,
//         [req.session.userid])
//         .then(results => {
//             res.send(results)
//             //res.send(results.name, results.time_in, results.time_out)
//         })
//         .catch(error => console.log(error))

// });

// set up Routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes,express.static(path.join(__dirname, '../user-page/user_homepage')));


app.listen(3000, function() {
    console.log("Connected to server, port 3000")
});