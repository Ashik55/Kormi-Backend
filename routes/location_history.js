const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const empty = "";
let helper = require("../Helper/helper");

// Registration new User
router.post("/location_history_insert", function (req, res) {
  let com_code = req.body.com_code;
  let user_id = req.body.user_id;
  let user_latlong = req.body.user_latlong;

  sql =
    "INSERT INTO location_history (com_code, user_id, user_latlong, create_date, update_date ) VALUES ('" +
    com_code +
    "', '" +
    user_id +
    "','" +
    user_latlong +
    "','" +
    today +
    "','" +
    today +
    "')";

  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Location inserted successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Location insert failed",
        error: err,
      });
    }
  });
});

// Get All Users
router.get("/location_histories", (req, res) => {
  db.query("SELECT * FROM location_history", (err, rows, fields) => {
    if (!err) {
      res.send({
        result: true,
        msg: "Location History Found",
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

// Get User Details
router.post("/location_list", (req, res) => {

  db.query(
    "SELECT * FROM location_history WHERE user_id = ? AND DATE(create_date) = ?",
    [req.body.user_id, req.body.date],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "Location Found",
          data: rows,
        });
      } else {
        res.send({
          result: false,
          msg: "Sorry something went wrong",
          error: err,
        });
      }
    }
  );
});






module.exports = router;
