const mysql = require("mysql")
const LOCALHOST = true;

if(LOCALHOST) {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin1234",
    database: "petsapp_database"
  })
}
connection.connect(function(err){
  if(err) throw err;
  else {
    console.log("connected to database");
  }
});
connection.query("SELECT * from users_to_pets", function(err, rows, fields){
  if(!err){
    console.log(rows);
  } else {
    console.log(err);
  }
})
