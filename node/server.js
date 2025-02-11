/* // Requiring modules
const express = require('express');
const app = express();
const mssql = require("mssql");

// Get request
app.get('/', function (req, res) {

 // Config your database credential
 const config = {
  user: 'server_operator',
  password: 'rXKE;{WC6dk*2:tjm=8#VQ',
  server: 'localhost',
  database: 'DND_TAX_DB',
 };

 // Connect to your database
 mssql.connect(config, function (err) {

  // Create Request object to perform
  // query operation
  let request = new mssql.Request();

  // Query to the database and get the records
  request.query('use DND_TAX_DB; select * from Player',
   function (err, records) {

     if (err) console.log(err)

     // Send records as a response
     // to browser
     res.send(records);

     mssql.close()

   });
 });
});

let server = app.listen(5000, function () {
 console.log('Server is listening at port 5000...');
});
 */

const express = require('express');
const mysql = require('mysql2');
const PORT = 5000;

const app = express();

const sqlConfig = {
 user: "server_operator",
 password: "rXKE;{WC6dk*2:tjm=8#VQ",
 server: 'localhost',
 database: 'DND_TAX_DB',
 port: 3306
};

app.get('/', function(req,res) {
 const connection = mysql.createConnection(sqlConfig);
 connection.connect();
 connection.query('SELECT * FROM Playable_character', function (error, results, fields){
  if (error) throw error;
  console.log(results);
 });
 connection.end()
})

app.listen(PORT,function() {
 console.log(`Server started at port ${PORT}`)
})