// Node.js + Express backend ...


const express = require("express");
const session = require("express-session")
const app = express();
app.use(session({
  name: "sid",
  resave: false,
  saveUninitialized: false,
  secret: "admin1234",
  cookie: {
    maxAge: 750000000,
    sameSite: true,
    secure: false,
  }
}));
app.use(express.urlencoded({extended: true}))
app.use(express.static("static_files"));
  
const mysql = require('mysql');
const LOCALHOST = true;

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

connection.query('SELECT * from time_board', function(err, rows, fields){
  if(!err)
    console.log(rows);
  else
    console.log(err);
})

connection.end();

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
   })


app.get('/users', (req, res) => {
  const allUsernames = Object.keys(Database);
  console.log('list of allUsernames is:', allUsernames);
  res.send(allUsernames);
});

app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; // matches ':userid' above
  const val = fakeDatabase[nameToLookup];
  console.log(nameToLookup, '->', val); // for debugging
  if (val) {
    res.send(val);
  } else {
    res.send({}); // failed, so return an empty object instead of undefined
  }
});


app.listen(3000, function(){
  console.log("Connected to server")
});
