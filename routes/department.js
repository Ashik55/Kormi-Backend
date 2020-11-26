const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const empty = "";
let helper = require("../Helper/helper");



// Create New Department
router.post("/create_dept", function (req, res) {
  let dept_name = req.body.dept_name;
  let dept_code = helper.makeid(15);
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
 

  sql =
    "INSERT INTO dept_info (dept_code, dept_name) VALUES ('" +
    dept_code +
    "', '" +
    dept_name +
    "')";

  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Department created successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Department creation failed",
        error: err,
      });
    }
  });
});

// Get All Users
router.get("/all_dept", (req, res) => {
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
 

  db.query("SELECT * FROM dept_info", (err, rows, fields) => {
    if (!err) {
      res.send({
        result: true,
        msg: "department Found",
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



// Update Department Name
router.put("/edit_dept", function (req, res) {
  let dept_code = req.body.dept_code;
  let dept_name = req.body.dept_name;

  var sql =
    "UPDATE dept_info SET dept_name = '" +
    dept_name +
    "' WHERE dept_code = '" +
    dept_code +
    "'";

  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Department Name Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Department Name Update Failed",
        error: err,
      });
    }
  });
});




//Delete Temp Company
router.post("/delete_department", function (req, res) {
  let dept_code = req.body.dept_code;
  mQuery = "DELETE FROM dept_info WHERE dept_code = '" + dept_code + "' ";
  db.query(
    "SELECT * FROM dept_info WHERE dept_code = '" + dept_code + "' ",
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
              msg: "Department Deleted successfully",
            });
          } else {
            res.send({
              result: false,
              msg: "Department Delete Failed",
              error: err,
            });
          }
        });
      } else {
        res.send({
          result: false,
          msg: "Sorry no Department found with dept_code " + dept_code,
          error: err,
          rows: rows,
        });
      }
    }
  );
});








module.exports = router;
