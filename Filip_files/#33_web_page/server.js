const mysql = require("mysql");
const LOCALHOST = true;

//defines connection to either remote or local database
if(LOCALHOST) {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin1234",
    database: "attendance_system"
  })
} else {
  var connection = mysql.createConnection({
    host: '192.168.108.24',
    user: 'remote_host',
    password: 'admin1234',
    database: 'attendance_system',
  })
}
//tries to connect to database
connection.connect(function(err){
  if(err) throw err;
  else {
    console.log("Connected to database");
  }
});

const express = require('express');
const app = express();

//sets root directory
app.use(express.static("static_files"))

app.listen(3000, () => {
  console.log("Server started at: https://localhost:3000/");
})

app.get('/users', (req, res) => {
  connection.query("SELECT * from users", function(err, rows, fields){
    if(!err){
      console.log(JSON.stringify(rows));
      res.send(JSON.stringify(rows));
    } else {
      console.log(err);
      res.send(err);
    }
  })
});



/*
connection.query('SELECT * from time_board', function(err, rows, fields){
  if(!err)
    console.log(rows);
  else
    console.log(err);
})

*/






/*
//basicaly end the script / disconnects from Database
connection.end(err => {
  console.log("Database disconnected.");
})
*/
