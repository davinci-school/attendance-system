// Node.js + Express backend ...
const express = require("express");
const app = express();

app.use(express.static("static_files"));
/*
(const fakeDatabase = {
  'Ondra': {job: 'student', pet: 'cat.jpg'},
  'Jana': {job: 'teacher',   pet: 'dog.jpg'},
  'Filip': {job: 'student',  pet: 'bear.jpg'}
};)
*/
var database

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
