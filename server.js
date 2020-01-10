

  // Node.js + Express backend ...

const Promise = require("promise");
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

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}


if (LOCALHOST) {
  //var connection = mysql.createConnection(
  config = {
    host: 'localhost',
    user: 'root',
    password: 'DaVinci@1',
    database: 'attendance_system',
  }
} else {
  //var connection = mysql.createConnection(
  config = {
    host: '192.168.108.24',
    user: 'remote_host',
    password: 'admin1234',
    database: 'attendance_system',
  }
}
connection = new Database(config)

// test connection and see all data in time_board
connection.query('SELECT * from time_board')
  .then(rows => console.log(rows))
  .catch(err => console.log(err))

// Redirect function
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

const convertSQL = (results) => {
    return (JSON.parse(JSON.stringify(results[0])))
}

const checkUserExist = (results, req, res) => {
    if (results.length > 0) { // SQL query return a match
        var rows = convertSQL(results)
        req.session.userid = rows.ID_users; // set session ID to user ID
        res.redirect('/home');
    } else {
        res.send('Incorrect Username and/or Password!');
    }

}

const checkUserAuthorization = (results, req, res) => {
  if (results.length > 0) {
      var rows = convertSQL(results)
      if (req.session.userid == rows.ID_users){
          console.log('user_ID',rows.ID_users);
          res.send(rows.ID_users.toString());
          return Promise.resolve(rows.ID_users.toString())
      } else {
          res.send('unathorizes access');
          return Promise.reject('promise rejeted unathorizes access');
      }
  } else {
    res.send('No such a user');
  }
}


app.get('/', (req, res) => {
  res.send(`
    <h1>Hello world</h1>
    <a href='/login'>login</a>
    <a href='/home'>home </a>
  `)
})
app.get('/home', redirectLogin, (req, res) => {
    res.sendFile("user-page/user_homepage/index.html", {root: "."})
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
     connection.query('SELECT * FROM users WHERE Email = ? AND password = ?', [email, password])
      .then(results => checkUserExist(results, req, res))
      .catch(err => console.log(err))
    }) //end of post


app.get('/users', (req, res) => {
  const allUsernames = Object.keys(Database);
  console.log('list of allUsernames is:', allUsernames);
  res.send(allUsernames);
});

app.get('/user_data_past_month', redirectLogin, (req, res) => {

  //res.send(nameToLookup);
  connection.query('SELECT * FROM time_board WHERE ID_users = 2 AND date BETWEEN SUBDATE(CURDATE(), INTERVAL 1 MONTH) AND NOW();', [req.session.userid])
  //.then(results => res.send(results))
    then(results => console.log(results))
    .catch(error => console.log(error))

});


app.listen(4000, function(){
  console.log("Connected to server, port 4000")
});
