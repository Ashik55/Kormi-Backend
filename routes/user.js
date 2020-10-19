const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
let helper = require("../Helper/helper");
const today = new Date().toISOString().slice(0, 19).replace('T', ' ');
const empty = "";



// Registration new User
router.post("/registration", function (req, res) {
  let user_name = req.body.user_name;
  let app_key = req.body.app_key;
  let user_email = req.body.user_email;
  let user_id = helper.makeid(25);

  db.query('SELECT user_email FROM user_info WHERE user_email ="' + user_email + '"', function (
    err,
    result
  ) {
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
          res.send({
            result: true,
            msg: "Registration success",
          });
        } else {
          res.send({
            result: false,
            msg: "Registration failed",
            error: err,
          });
        }
      });
    } else {
      // Email exist
      res.send({
        result: false,
        error: "Email already used",
      });
    }
  });
});

// Get User Details
router.get("/user_details/:user_id", (req, res) => {
  db.query(
    "SELECT * FROM user_info WHERE user_id = ?",
    [req.params.user_id],
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

// Get User Details using email
router.get("/user_details_email/:user_email", (req, res) => {
  db.query(
    "SELECT * FROM user_info WHERE user_email = ?",
    [req.params.user_email],
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
router.put('/user_name_update', function(req, res) {
    let user_name = req.body.user_name;
    let user_id = req.body.user_id;

    var sql = "UPDATE user_info SET user_name = '" + user_name + "' WHERE user_id = '" + user_id + "'";
    db.query(sql, function(err, result) {
          if (!err) {
            res.send({
                result: true,
                msg: 'User Name Updated successfully'
            })
        } else {
            res.send({
                result: false,
                msg: 'User Name Update Failed',
                error: err
            })
        }

    });

});


// Update userNAme 
router.put('/user_number_update', function(req, res) {
    let user_number = req.body.user_number;
    let user_id = req.body.user_id;

    var sql = "UPDATE user_info SET user_number = '" + user_number + "' WHERE user_id = '" + user_id + "'";
    db.query(sql, function(err, result) {
          if (!err) {
            res.send({
                result: true,
                msg: 'User Name Updated successfully'
            })
        } else {
            res.send({
                result: false,
                msg: 'User Name Update Failed',
                error: err
            })
        }

    });

});


// Update Company Update 
router.put('/user_com_update', function(req, res) {
    let com_code = req.body.com_code;
    let com_name = req.body.com_name;
    let user_id = req.body.user_id;

    var sql = "UPDATE user_info SET com_code = '" + com_code + "', com_name = '" + com_name + "' WHERE user_id = '" + user_id + "'";
    db.query(sql, function(err, result) {
          if (!err) {
            res.send({
                result: true,
                msg: 'Company Updated successfully'
            })
        } else {
            res.send({
                result: false,
                msg: 'Company Update Failed',
                error: err
            })
        }

    });

});


// Update Department 
router.put('/user_dept_update', function(req, res) {
    let dept_code = req.body.dept_code;
    let dept_name = req.body.dept_name;
    let user_id = req.body.user_id;

    var sql = "UPDATE user_info SET dept_code = '" + dept_code + "', dept_name = '" + dept_name + "' WHERE user_id = '" + user_id + "'";
    db.query(sql, function(err, result) {
          if (!err) {
            res.send({
                result: true,
                msg: 'Department Updated successfully'
            })
        } else {
            res.send({
                result: false,
                msg: 'Department Update Failed',
                error: err
            })
        }

    });

});


// Update Home 
router.put('/user_home_update', function(req, res) {
    let address_home = req.body.address_home;
    let home_latlong = req.body.home_latlong;
    let user_id = req.body.user_id;

    var sql = "UPDATE user_info SET address_home = '" + address_home + "', home_latlong = '" + home_latlong + "' WHERE user_id = '" + user_id + "'";
    db.query(sql, function(err, result) {
          if (!err) {
            res.send({
                result: true,
                msg: 'Home Updated successfully'
            })
        } else {
            res.send({
                result: false,
                msg: 'Home Update Failed',
                error: err
            })
        }

    });

});


// Update Office 
router.put('/user_office_update', function(req, res) {
    let address_office = req.body.address_office;
    let office_latlong = req.body.office_latlong;
    let user_id = req.body.user_id;

    var sql = "UPDATE user_info SET address_office = '" + address_office + "', office_latlong = '" + office_latlong + "' WHERE user_id = '" + user_id + "'";
    db.query(sql, function(err, result) {
          if (!err) {
            res.send({
                result: true,
                msg: 'Office Updated successfully'
            })
        } else {
            res.send({
                result: false,
                msg: 'Office Update Failed',
                error: err
            })
        }

    });

});











module.exports = router;