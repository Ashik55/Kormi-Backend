const express = require("express");
const db = require("../Connection/db");
const router = express.Router();

const empty = "";
let helper = require("../Helper/helper");

// Registration new Deal
router.post("/create_deal", function (req, res) {
  let deal_name = req.body.deal_name;
  let deal_amount = req.body.deal_amount;
  let deal_stage = req.body.deal_stage;
  let deal_close_date = req.body.deal_close_date;
  let deal_progress = req.body.deal_progress;
  let deal_type = req.body.deal_type;
  let deal_owner = req.body.deal_owner;
  let com_code = req.body.com_code;
  let assigned_to_name = req.body.assigned_to_name;

  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
 
  let deal_code = helper.makeid(15);

  sql =
    "INSERT INTO deal_info (deal_code, deal_name, deal_amount, deal_stage, deal_close_date,deal_progress,deal_type,deal_owner, create_date,update_date ) VALUES ('" +
    deal_code +
    "', '" +
    deal_name +
    "','" +
    deal_amount +
    "','" +
    deal_stage +
    "','" +
    deal_close_date +
    "','" +
    deal_progress +
    "','" +
    deal_type +
    "','" +
    deal_owner +
    "','" +
    today +
    "','" +
    today +
    "')";

  db.query(sql, function (err, result) {
    if (!err) {
      sql2 =
        "INSERT INTO deal_assignment (com_code, deal_code, assigned_by, assigned_to,assigned_to_name, assignment_serial,create_date ) VALUES ('" +
        com_code +
        "', '" +
        deal_code +
        "','" +
        deal_owner +
        "','" +
        deal_owner +
        "','" +
        assigned_to_name +
        "','" +
        "1" +
        "','" +
        today +
        "')";

      db.query(sql2, function (err, result) {
        if (!err) {
          res.send({
            result: true,
            deal_code: deal_code,
            msg: "Deal Assigned successfully",
          });
        } else {
          res.send({
            result: false,
            msg: "Deal assign failed",
            error: err,
          });
        }
      });
    } else {
      res.send({
        result: false,
        msg: "Deal creation failed",
        error: err,
      });
    }
  });
});

// Get All Users
router.get("/all_deals", (req, res) => {
  db.query("SELECT * FROM deal_info", (err, rows, fields) => {
    if (!err) {
      res.send({
        result: true,
        msg: "Deal Found",
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
router.get("/deal_details", (req, res) => {
  db.query(
    "SELECT * FROM deal_info WHERE deal_code = ?",
    [req.body.deal_code],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "Deal Found",
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

// Get User Details
router.get("/deal_list", (req, res) => {
  db.query(
    "SELECT * FROM deal_info WHERE deal_owner = ?",
    [req.body.deal_owner],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "Deals Found",
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

// Update userNAme
router.put("/deal_update", function (req, res) {
  let deal_name = req.body.deal_name;
  let deal_amount = req.body.deal_amount;
  let deal_stage = req.body.deal_stage;
  let deal_close_date = req.body.deal_close_date;
  let deal_progress = req.body.deal_progress;
  let deal_type = req.body.deal_type;
  let deal_code = req.body.deal_code;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
 
  var sql =
    "UPDATE deal_info SET deal_name = '" +
    deal_name +
    "',deal_amount = '" +
    deal_amount +
    "',deal_stage = '" +
    deal_stage +
    "',deal_close_date = '" +
    deal_close_date +
    "',deal_progress = '" +
    deal_progress +
    "',deal_type = '" +
    deal_type +
    "',update_date = '" +
    today +
    "' WHERE deal_code = '" +
    deal_code +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Deal Details Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Deal Details Update Failed",
        error: err,
      });
    }
  });
});

// Update Deal Progresss
router.put("/deal_progress_update", function (req, res) {
  let deal_progress = req.body.deal_progress;
  let deal_code = req.body.deal_code;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
 
  var sql =
    "UPDATE deal_info SET deal_progress = '" +
    deal_progress +
    "',update_date = '" +
    today +
    "' WHERE deal_code = '" +
    deal_code +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Deal Progress Updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Deal Progress Update Failed",
        error: err,
      });
    }
  });
});

// Update Deal stage
router.put("/deal_stage_update", function (req, res) {
  let deal_stage = req.body.deal_stage;
  let deal_code = req.body.deal_code;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
 
  var sql =
    "UPDATE deal_info SET deal_stage = '" +
    deal_stage +
    "',update_date = '" +
    today +
    "' WHERE deal_code = '" +
    deal_code +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Deal Stage Updated Successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Deal Stage Update Failed",
        error: err,
      });
    }
  });
});



// Get all assigned deals
router.post("/mydeal_list", (req, res) => {
  //Inner join Examples
  // https://www.mysqltutorial.org/mysql-inner-join.aspx/
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
 

  
  db.query(
    "SELECT * FROM deal_assignment INNER JOIN deal_info USING (deal_code) WHERE assigned_to = ?",
    [req.body.user_id],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "Deals Found",
          data: rows,
        });
      } else {
        res.send({
          result: false,
          msg: "No data found",
          error: err,
        });
      }
    }
  );
});




module.exports = router;
