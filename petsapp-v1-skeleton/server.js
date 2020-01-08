// Node.js + Express backend ...


const express = require("express");
const session = require("express-session")
const app = express();
app.use(session({
  name: "sid",
  resave: false,
  saveUninitialized: false,
  secret: "admin1234",
  cookie: { //create a cookie
    maxAge: 750000000, //set cookie lifetime to 208.3 hours
    sameSite: true,
    secure: false,
  }
}));
app.use(express.urlencoded({extended: true}))
app.use(express.static("static_files"));

const mysql = require('mysql');
const LOCALHOST = false;

if (LOCALHOST) {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'attendance_system',
  })
} else {
  var connection = mysql.createConnection({
    host: '192.168.108.24',
    user: 'remote_host',
    password: 'admin1234',
    database: 'attendance_system',
  })
}

connection.connect(function(err){
  if(err) throw err;
  else {
    console.log('Connected with database')
  }
});

// connection.query('SELECT * from time_board', function(err, rows, fields){
//   if(!err)
//     console.log(rows);
//   else
//     console.log(err);
// })

//connection.end();

const redirectLogin = (req, res, next) =>{
  if (!req.session.userid) {
    res.redirect("/Login")
  }
  else {next()}
}

const redirectHome = (req, res, next) =>{
  if (req.session.userid) {
    res.redirect("/home")
  }
  else {next()}
}


app.get('/', (req, res) => {
  res.send(`
    <h1>Hello world</h1>
    <a href='/login'>login</a>
    <a href='/home'>home </a>
  `)
})
app.get('/home', redirectLogin, (req, res) => {
    res.sendFile("static_files/petsapp.html", {root: "."})
})


app.route("/Login")
  .get(redirectHome, (req, res) => {
console.log(req.session)
  res.send(`
    <h1>Login page</h1>
    <form method="post" action="/login">
      <input type="email" name="email" placeholder="Email" require />
      <input type="password" name="password" placeholder="Password" require />
      <input type="submit"/>
    </form>
    `)
    })

   .post(redirectHome, (req, res) =>{
     const {email, password} = req.body
     console.log(email, password)
     connection.query('SELECT * FROM users WHERE Email = ? AND password = ?', [email, password], function(error, results, fields) {
       if (!error) {

        if (results.length > 0) {
          var rows = (JSON.parse(JSON.stringify(results[0])))
          req.session.userid = rows.ID_users;
  				res.redirect('/home');
  			} else {
  				res.send('Incorrect Username and/or Password!');
  			}
  			res.end();
      } else {
        console.log(error);
      }
    })

   })


app.get('/users', (req, res) => {
  const allUsernames = Object.keys(Database);
  console.log('list of allUsernames is:', allUsernames);
  res.send(allUsernames);
});

app.get('/users/:username', redirectLogin, (req, res) => {
  const nameToLookup = req.params.username; // matches ':userid' above
  console.log(nameToLookup);
  connection.query('SELECT * FROM users WHERE username = ?', [nameToLookup], function(error, results, fields) {
    res.send([{ 'arrived': '12', 'leave': '15', 'data':'20.12'},
              { 'arrived': '12', 'leave': '15', 'data':'20.12'},
              { 'arrived': '12', 'leave': '15', 'data':'20.12'}])
  })
});


app.listen(4000, function(){
  console.log("Connected to server, port 4000")
});
