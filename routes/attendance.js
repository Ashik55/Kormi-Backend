const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const today = new Date().toISOString().slice(0, 19).replace("T", " ");
const empty = "";
let helper = require("../Helper/helper");

// Task insert
router.post("/insert_attendance", function (req, res) {
  let user_id = req.body.user_id;
  let com_code = req.body.com_code;
  let in_time = req.body.in_time;
  let in_loc = req.body.in_loc;
  sql =
    "INSERT INTO attendance (user_id, com_code, in_time, in_loc, out_time,out_loc, create_date) VALUES ('" +
    user_id +
    "', '" +
    com_code +
    "','" +
    in_time +
    "','" +
    in_loc +
    "','" +
    today +
    "','" +
    empty +
    "','" +
    today +
    "')";

  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Attendance Inserted successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Attendance Insertion failed",
        error: err,
      });
    }
  });
});

// Update Task Status
router.put("/attendance_update", function (req, res) {
  let id = req.body.id;
  let user_id = req.body.user_id;
  let out_time = req.body.out_time;
  let out_loc = req.body.out_loc;

  var sql =
    "UPDATE attendance SET out_time = '" +
    out_time +
    "', out_loc = '" +
    out_loc +
    "' WHERE user_id = '" +
    user_id +
    "' AND id = '" +
    id +
    "'AND DATE(create_date) = '"+helper.formatDate(today)+"' ";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Attendance updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Attendance update Failed",
        error: err,
      });
    }
  });
});



// Get User Details
router.post("/attendance_list", (req, res) => {

    db.query(
      "SELECT * FROM attendance WHERE user_id = ?  AND out_loc = ? AND DATE(create_date) = ?",
      [req.body.user_id, empty, helper.formatDate(today)],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            result: true,
            msg: "Already Checked in",
            data: rows,
          });
        } else {
          res.send({
            result: false,
            msg: "Not Checked in yet",
            error: err,
          });
        }
      }
    );
  });
  





module.exports = router;
