var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin1234',
  database: 'attendance_system',
})

connection.connect(function(err){
  if(err) throw err;
  else {
    console.log('Connected with database')
  }
});

connection.query('SELECT * from users', function(err, rows, fields){
  if(!err)
    console.log(rows);
  else
    console.log('Error');
})

connection.end();
