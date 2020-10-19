const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'kormi',
    password: 'CS0amcTe9QlApey6',
    database: 'kormi_api'
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = connection;
