const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const empty = "";
let helper = require("../Helper/helper");


// Task insert
router.post("/insert_attendance", function (req, res) {
  let user_id = req.body.user_id;
  let com_code = req.body.com_code;
  let in_loc = req.body.in_loc;

  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log(today);
 
  


  db.query(
    "SELECT * FROM attendance WHERE user_id = ?  AND out_loc = ? AND DATE(create_date) = ?",
    [req.body.user_id, empty, helper.formatDate(today)],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          var sql =
            "UPDATE attendance SET out_time = '" +
            today +
            "', out_loc = '" +
            in_loc +
            "' WHERE user_id = '" +
            user_id +
            "' AND id = '" +
            rows[0].id +
            "'AND DATE(create_date) = '" +
            helper.formatDate(today) +
            "' ";
          db.query(sql, function (err, result) {
            if (!err) {
              res.send({
                result: true,
                msg: "Attendance updated successfully",
                data: [],
              });
            } else {
              res.send({
                result: false,
                msg: "Attendance update Failed",
                error: err,
              });
            }
          });
        } else {
          sql =
            "INSERT INTO attendance (user_id, com_code, in_time, in_loc, out_time,out_loc, create_date) VALUES ('" +
            user_id +
            "', '" +
            com_code +
            "','" +
            today +
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
              db.query(
                "SELECT * FROM attendance WHERE user_id = ?  AND out_loc = ? AND DATE(create_date) = ?",
                [req.body.user_id, empty, helper.formatDate(today)],
                (err, rows, fields) => {
                  if (!err) {
                    res.send({
                      result: true,
                      msg: "Attendance Inserted successfully",
                      data: rows[0],
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
            } else {
              res.send({
                result: false,
                msg: "Attendance Insertion failed",
                error: err,
              });
            }
          });
        }
      } else {
        res.send({
          result: false,
          msg: "Sorry Something went wrong",
          error: err,
        });
      }
    }
  );
});

// Update Task Status
router.post("/attendance_update", function (req, res) {
  let id = req.body.id;
  let user_id = req.body.user_id;
  let out_time = req.body.out_time;
  let out_loc = req.body.out_loc;

  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log(today);



  var sql =
    "UPDATE attendance SET out_time = '" +
    out_time +
    "', out_loc = '" +
    out_loc +
    "' WHERE user_id = '" +
    user_id +
    "' AND id = '" +
    id +
    "'AND DATE(create_date) = '" +
    helper.formatDate(today) +
    "' ";
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
router.post("/get_attendance", (req, res) => {


  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log(today);

  db.query(
    "SELECT * FROM attendance WHERE user_id = ?  AND out_loc = ? AND DATE(create_date) = ?",
    [req.body.user_id, empty, helper.formatDate(today)],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.send({
            result: true,
            msg: "Already Checked in",
            data: rows[0],
          });
        } else {
          res.send({
            result: false,
            msg: "Not Checked in yet",
          });
        }
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

// Get all assigned deals
router.post("/attendance_list", (req, res) => {
  //Inner join Examples
  // https://www.mysqltutorial.org/mysql-inner-join.aspx/


  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log(today);
  var date = helper.formatDate(today);
  console.log(date);



  db.query(
    "SELECT * FROM attendance WHERE user_id = ? AND create_date >= ? ORDER BY  out_time  DESC LIMIT 2",
    [req.body.user_id, date],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.send({
            result: true,
            msg: "Attendance Found",
            data: rows,
          });
        } else {
          res.send({
            result: false,
            msg: "No attendance data Found",
            data: rows,
          });
        }
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
