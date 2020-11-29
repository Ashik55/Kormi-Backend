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
  let parent_id = req.body.parent_id;

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
              "INSERT INTO emp_tree (com_code, user_id,user_name, parent_id ) VALUES ('" +
              com_code +
              "', '" +
              user_id +
              "', '" +
              user_name +
              "', '" +
              parent_id +
              "')";

            db.query(sql, function (err, result) {
              if (!err) {
                res.send({
                  result: true,
                  msg: "data added successfully",
                });
              } else {
                res.send({
                  result: false,
                  msg: "Data add failed",
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
        sql =
          "INSERT INTO emp_tree (com_code, user_id,user_name, parent_id ) VALUES ('" +
          com_code +
          "', '" +
          user_id +
          "', '" +
          user_name +
          "', '" +
          parent_id +
          "')";

        db.query(sql, function (err, result) {
          if (!err) {
            res.send({
              result: true,
              msg: "data added successfully",
            });
          } else {
            res.send({
              result: false,
              msg: "Data add failed",
              error: err,
            });
          }
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
          result: true,
          msg: "Sorry no previous data found for com_code " + com_code,
          error: err,
          data: rows,
        });
      }
    }
  );
});

module.exports = router;
