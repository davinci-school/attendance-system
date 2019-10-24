var mysql = require('mysql');
var LOCALHOST = true;

if (LOCALHOST) {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DaVinci@1',
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
