const express = require("express");
const db = require("../Connection/db");
const router = express.Router();

const empty = "";
let helper = require("../Helper/helper");


// Registration new User
router.post("/create_company_temp", function (req, res) {
  let com_name = req.body.com_name;
  let com_address = req.body.com_address;
  let com_latlong = req.body.com_latlong;
  let user_ref_id = req.body.user_ref_id;
  let com_mobile = req.body.com_mobile;
  let com_email = req.body.com_email;
  let com_size = req.body.com_size;
  let com_type = req.body.com_type;
  let com_contact_person = req.body.com_contact_person;

  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
 
  let com_code = helper.makeid(15);

  sql =
    "INSERT INTO company_temp (com_code, com_name, com_address, com_latlong, user_ref_id,com_mobile, com_email,com_size,com_type, com_contact_person) VALUES ('" +
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
router.get("/temp_companies", (req, res) => {
  db.query("SELECT * FROM company_temp", (err, rows, fields) => {
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





// Update Temp Company details
router.put("/update_company_temp", function (req, res) {
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
    "UPDATE company_temp SET com_name = '" +
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








//Delete Temp Company
router.post("/delete_temp_com", function (req, res) {
  let com_code = req.body.com_code;
  mQuery = "DELETE FROM company_temp WHERE com_code = '" + com_code + "' ";
  db.query(
    "SELECT * FROM company_temp WHERE com_code = '" + com_code + "' ",
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
              msg: "Temp Company Deleted successfully",
            });
          } else {
            res.send({
              result: false,
              msg: "Temp Company Delete Failed",
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
