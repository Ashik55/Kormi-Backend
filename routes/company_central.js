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
  let enable= 1;
  let paid= 0;
  let com_code = helper.makeid(15);

  sql =
    "INSERT INTO company_central (com_code, com_name, com_address, com_latlong,com_mobile,com_email,com_size,com_type,com_contact_person, enable, paid ) VALUES ('" +
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
    "','" +
    enable +
    "','" +
    paid +
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





// Update Company details
router.put("/update_company_central", function (req, res) {
  let com_name = req.body.com_name;
  let com_address = req.body.com_address;
  let com_latlong = req.body.com_latlong;
  let com_mobile = req.body.com_mobile;
  let com_email = req.body.com_email;
  let com_size = req.body.com_size;
  let com_type = req.body.com_type;
  let com_contact_person = req.body.com_contact_person;
  let com_code = req.body.com_code;

  sql =
    "UPDATE company_central SET com_name = '" +
    com_name +
    "', com_address = '" +
    com_address +
    "', com_latlong = '" +
    com_latlong +
    "', com_mobile = '" +
    com_mobile +
    "', com_email = '" +
    com_email +
    "',com_size = '" +
    com_size +
    "',com_type = '" +
    com_type +
    "',com_contact_person = '" +
    com_contact_person +
    "' WHERE com_code = '" +
    com_code +
    "' ";

  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Company Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Company Update failed",
        error: err,
      });
    }
  });
});





// Update Company details
router.put("/update_company_enable", function (req, res) {
  let com_code = req.body.com_code;
  let enable = req.body.enable;
  sql =
    "UPDATE company_central SET enable = '" +
    enable +
    "' WHERE com_code = '" +
    com_code +
    "' ";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Company Enable Column Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Company Enable Column Update failed",
        error: err,
      });
    }
  });
});



// Update Company details
router.put("/update_company_paid", function (req, res) {
  let com_code = req.body.com_code;
  let paid = req.body.paid;
  sql =
    "UPDATE company_central SET paid = '" +
    paid +
    "' WHERE com_code = '" +
    com_code +
    "' ";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Company Paid Column Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Company Paid Column Update failed",
        error: err,
      });
    }
  });
});





//Delete Company
router.post("/delete_central_com", function (req, res) {
  let com_code = req.body.com_code;
  mQuery = "DELETE FROM company_central WHERE com_code = '" + com_code + "' ";
  db.query(
    "SELECT * FROM company_central WHERE com_code = '" + com_code + "' ",
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send({
          result: false,
          msg: "Sorry something went wrong",
          data: rows,
        });
      } else if (rows.length > 0) {
        db.query(mQuery, function (err, result) {
          if (!err) {
            res.send({
              result: true,
              msg: "Central Company Deleted successfully",
            });
          } else {
            res.send({
              result: false,
              msg: "Central Company Delete Failed",
              error: err,
            });
          }
        });
      } else {
        res.send({
          result: false,
          msg: "Sorry no company found with com_code " + com_code,
          error: err,
          rows: rows,
        });
      }
    }
  );
});









module.exports = router;
