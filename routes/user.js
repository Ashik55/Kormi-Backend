const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
let helper = require("../Helper/helper");
const today = new Date().toISOString().slice(0, 19).replace("T", " ");
const empty = "";



// Registration new User
router.post("/registration", function (req, res) {
  let user_name = req.body.user_name;
  let app_key = req.body.app_key;
  let user_email = req.body.user_email;
  let user_id = helper.makeid(25);

  db.query(
    'SELECT app_key FROM user_info WHERE app_key ="' + app_key + '"',
    function (err, result) {
      if (err) throw err;
      console.log(result);

      if (result.length === 0) {
        // Email not exist
        sql =
          "INSERT INTO user_info (user_name, app_key, user_email, user_id, create_date, update_date, com_code, com_name, dept_code, dept_name, user_number, address_home, home_latlong, address_office, office_latlong) VALUES ('" +
          user_name +
          "', '" +
          app_key +
          "','" +
          user_email +
          "','" +
          user_id +
          "','" +
          today +
          "','" +
          today +
          "','" +
          empty +
          "','" +
          empty +
          "','" +
          empty +
          "','" +
          empty +
          "','" +
          empty +
          "','" +
          empty +
          "','" +
          empty +
          "','" +
          empty +
          "','" +
          empty +
          "')";

        db.query(sql, function (err, result) {
          if (!err) {
            db.query(
              "SELECT * FROM user_info WHERE app_key = ? ",
              [app_key],
              (err, rows, fields) => {
                if (!err) {
                  if (rows.length === 0) {
                    res.send({
                      result: false,
                      msg: "App key already exist but no data found",
                      data: [],
                    });
                  } else {
                    res.send({
                      result: true,
                      msg: "Registration success",
                      data: rows[0],
                    });
                  }
                } else {
                  console.log(err);
                }
              }
            );
          } else {
            res.send({
              result: false,
              msg: "Registration failed",
              error: err,
            });
          }
        });
      } else {
        // App Key exist send user Data

        db.query(
          "SELECT * FROM user_info WHERE app_key = ? ",
          [app_key],
          (err, rows, fields) => {
            if (!err) {
              if (rows.length === 0) {
                res.send({
                  result: false,
                  msg: "App key already exist but no data found",
                  data: [],
                });
              } else {
                res.send({
                  result: true,
                  msg: "welcome for re-login",
                  data: rows[0],
                });
              }
            } else {
              console.log(err);
            }
          }
        );
      }
    }
  );
});

// Get User Details
router.post("/user_details", (req, res) => {
  db.query(
    "SELECT * FROM user_info WHERE user_id = ?",
    [req.body.user_id],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "User Details Found",
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
});


// Get User Details using email
router.post("/user_details_email", (req, res) => {
  db.query(
    "SELECT * FROM user_info WHERE user_email = ?",
    [req.body.user_email],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "User Details Found",
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


// Get User of same companies
router.post("/userlist_samecom", (req, res) => {
  db.query(
    "SELECT * FROM user_info WHERE com_code = ? AND NOT (user_id = ?)",
    [req.body.com_code, req.body.user_id],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "User Details Found",
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


// Get All Users
router.get("/users", (req, res) => {
  db.query("SELECT * FROM user_info", (err, rows, fields) => {
    if (!err) {
      res.send({
        result: true,
        msg: "User Details Found",
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

// Update userNAme
router.put("/user_name_update", function (req, res) {
  let user_name = req.body.user_name;
  let user_id = req.body.user_id;

  var sql =
    "UPDATE user_info SET user_name = '" +
    user_name +
    "',update_date = '" +
    today +
    "' WHERE user_id = '" +
    user_id +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "User Name Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "User Name Update Failed",
        error: err,
      });
    }
  });
});

// Update userNAme
router.put("/user_number_update", function (req, res) {
  let user_number = req.body.user_number;
  let user_id = req.body.user_id;

  var sql =
    "UPDATE user_info SET user_number = '" +
    user_number +
    "',update_date = '" +
    today +
    "' WHERE user_id = '" +
    user_id +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "User Name Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "User Name Update Failed",
        error: err,
      });
    }
  });
});

// Update Company Update
router.put("/user_com_update", function (req, res) {
  let com_code = req.body.com_code;
  let com_name = req.body.com_name;
  let user_id = req.body.user_id;

  var sql =
    "UPDATE user_info SET com_code = '" +
    com_code +
    "', com_name = '" +
    com_name +
    "',update_date = '" +
    today +
    "' WHERE user_id = '" +
    user_id +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Company Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Company Update Failed",
        error: err,
      });
    }
  });
});

// Update Department
router.put("/user_dept_update", function (req, res) {
  let dept_code = req.body.dept_code;
  let dept_name = req.body.dept_name;
  let user_id = req.body.user_id;

  var sql =
    "UPDATE user_info SET dept_code = '" +
    dept_code +
    "', dept_name = '" +
    dept_name +
    "',update_date = '" +
    today +
    "' WHERE user_id = '" +
    user_id +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Department Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Department Update Failed",
        error: err,
      });
    }
  });
});

// Update Home
router.put("/user_home_update", function (req, res) {
  let address_home = req.body.address_home;
  let home_latlong = req.body.home_latlong;
  let user_id = req.body.user_id;

  var sql =
    "UPDATE user_info SET address_home = '" +
    address_home +
    "', home_latlong = '" +
    home_latlong +
    "',update_date = '" +
    today +
    "' WHERE user_id = '" +
    user_id +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Home Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Home Update Failed",
        error: err,
      });
    }
  });
});

// Update Office
router.put("/user_office_update", function (req, res) {
  let address_office = req.body.address_office;
  let office_latlong = req.body.office_latlong;
  let user_id = req.body.user_id;

  var sql =
    "UPDATE user_info SET address_office = '" +
    address_office +
    "', office_latlong = '" +
    office_latlong +
    "',update_date = '" +
    today +
    "' WHERE user_id = '" +
    user_id +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Office Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Office Update Failed",
        error: err,
      });
    }
  });
});

module.exports = router;
