const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const today = new Date().toISOString().slice(0, 19).replace('T', ' ');
const empty = "";
let helper = require("../Helper/helper");


// Registration new User
router.post("/create_company_temp", function (req, res) {
  let com_name = req.body.com_name;
  let com_address = req.body.com_address;
  let com_latlong = req.body.com_latlong;
  let user_ref_id = req.body.user_ref_id;
  let com_code = helper.makeid(15);

  sql =
    "INSERT INTO company_info (com_code, com_name, com_address, com_latlong, user_ref_id, create_date, update_date) VALUES ('" +
    com_code +
    "', '" +
    com_name +
    "','" +
    com_address +
    "','" +
    com_latlong +
    "','" +
    user_ref_id +
    "','" +
    today +
    "','" +
    today +
    "')";

  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Company Created successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Company creation failed",
        error: err,
      });
    }
  });
});


// Get All Users
router.get("/temp_companies", (req, res) => {
  db.query("SELECT * FROM company_info", (err, rows, fields) => {
    if (!err) {
      res.send({
        result: true,
        msg: "company_info Found",
        data: rows,
      });
    } else {
      res.send({
        result: false,
        msg: "Sorry something went wrong",
        error: err,
      });
    }
  });
});















module.exports = router;
