const mysql = require("mysql");
const LOCALHOST = false;

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
connection.connect(function(err){
  if(err) throw err;
  else {
    console.log("connected to database");
  }
});
connection.query("SELECT * from users", function(err, rows, fields){
  if(!err){
    console.log(rows);
  } else {
    console.log(err);
  }
})

/*
querry = dotaz
tenhle script se umi pripojit na databzi ktera je bud lokalni nenbo remote_host
umi dat dotaz

*/






connection.end(err => {
  console.log("Disconnected from database, server ended.");
});
