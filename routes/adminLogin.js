const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
let helper = require("../Helper/helper");
const empty = "";

// Admin Login
router.post("/admin_login", function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  db.query(
    'SELECT * FROM admin WHERE email ="' +
      email +
      '" AND password ="' +
      password +
      '" ',
    function (err, rows) {
      if (err) throw err;
      if (rows.length === 0) {
        res.send({
          result: false,
          msg: "Wrong email password",
        });
      } else {
        res.send({
          result: true,
          msg: "Login successfull",
          data: rows[0],
        });
      }
    }
  );
});


// Admin insertion
router.post("/admin_create", function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;
  let com_code = req.body.com_code;
  sql =
    "INSERT INTO admin (email, password, role, com_code) VALUES ('" +
    email +
    "', '" +
    password +
    "','" +
    role +
    "','" +
    com_code +
    "')";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Admin Created successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Admin creation failed",
        error: err,
      });
    }
  });
});




module.exports = router;
