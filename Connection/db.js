const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "kormi",
  password: "CS0amcTe9QlApey6",
  database: "kormi",
  timezone: "utc-6",
});
connection.connect((err) => {
  if (err) throw err;

  console.log("Connected!");



  // Keep Server Alive to avoid auto shut down
  // https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
  
  setInterval(function () {
    connection.query("SELECT 1");
    // console.log("set Interval running!");
  }, 5000);


});

module.exports = connection;
