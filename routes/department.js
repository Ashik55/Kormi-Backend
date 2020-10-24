const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const today = new Date().toISOString().slice(0, 19).replace("T", " ");
const empty = "";
let helper = require("../Helper/helper");



// Create New Department
router.post("/create_dept", function (req, res) {
  let dept_name = req.body.dept_name;
  let dept_code = helper.makeid(15);

  sql =
    "INSERT INTO dept_info (dept_code, dept_name, create_date, update_date) VALUES ('" +
    dept_code +
    "', '" +
    dept_name +
    "','" +
    today +
    "','" +
    today +
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







module.exports = router;
