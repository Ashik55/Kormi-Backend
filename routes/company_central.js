const express = require("express");
const db = require("../Connection/db");
const router = express.Router();

const empty = "";
let helper = require("../Helper/helper");



// Registration new User
router.post("/create_company_central", function (req, res) {
  let com_name = req.body.com_name;
  let com_address = req.body.com_address;
  let com_latlong = req.body.com_latlong;
  let com_mobile = req.body.com_mobile;
  let com_email = req.body.com_email;
  let com_size = req.body.com_size;
  let com_type = req.body.com_type;
  let com_contact_person = req.body.com_contact_person;
  let com_code = helper.makeid(15);

  sql =
    "INSERT INTO company_central (com_code, com_name, com_address, com_latlong,com_mobile,com_email,com_size,com_type,com_contact_person ) VALUES ('" +
    com_code +
    "', '" +
    com_name +
    "','" +
    com_address +
    "','" +
    com_latlong +
    "','" +
    com_mobile +
    "','" +
    com_email +
    "','" +
    com_size +
    "','" +
    com_type +
    "','" +
    com_contact_person +
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
router.get("/central_companies", (req, res) => {


  db.query("SELECT * FROM company_central", (err, rows, fields) => {
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
