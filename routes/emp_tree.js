const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const empty = "";
let helper = require("../Helper/helper");

// Create New Department
router.post("/insert_emp_tree", function (req, res) {
  let com_code = req.body.com_code;
  let user_id = req.body.user_id;
  let user_name = req.body.user_name;
  let child_id = req.body.child_id;

  db.query(
    "SELECT * FROM emp_tree WHERE com_code = '" + com_code + "' ",
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send({
          result: false,
          msg: "Sorry something went wrong check Error",
          data: rows,
          error: err,
        });
      } else if (rows.length > 0) {
        //Data Available in Emplyee table
        mQuery = "DELETE FROM emp_tree WHERE com_code = '" + com_code + "' ";
        db.query(mQuery, function (err, result) {
          if (!err) {
            sql =
              "INSERT INTO emp_tree (com_code, user_id,user_name,child_id ) VALUES ('" +
              com_code +
              "', '" +
              user_id +
              "', '" +
              user_name +
              "', '" +
              child_id +
              "')";

            db.query(sql, function (err, result) {
              if (!err) {
                res.send({
                  result: true,
                  msg: "Child added successfully",
                });
              } else {
                res.send({
                  result: false,
                  msg: "DChild add failed",
                  error: err,
                });
              }
            });
          } else {
            res.send({
              result: false,
              msg: "Employee tree delete failed",
              error: err,
            });
          }
        });
      } else {
        res.send({
          result: false,
          msg: "Sorry no Employee found with com_code " + com_code,
          error: err,
          rows: rows,
        });
      }
    }
  );
});

// Create New Department
router.post("/get_emp_tree", function (req, res) {
  let com_code = req.body.com_code;

  db.query(
    "SELECT * FROM emp_tree WHERE com_code = '" + com_code + "' ",
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send({
          result: false,
          msg: "Sorry something went wrong check Error",
          data: rows,
          error: err,
        });
      } else if (rows.length > 0) {
        //Data Available in Emplyee table

        res.send({
          result: true,
          msg: "Employee Tree Found",
          data: rows,
        });
      } else {
        res.send({
          result: false,
          msg: "Sorry no Employee found with com_code " + com_code,
          error: err,
          rows: rows,
        });
      }
    }
  );
});

module.exports = router;
