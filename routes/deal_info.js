const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const today = new Date().toISOString().slice(0, 19).replace("T", " ");
const empty = "";
let helper = require("../Helper/helper");

// Registration new User
router.post("/create_deal", function (req, res) {
  let deal_name = req.body.deal_name;
  let deal_amount = req.body.deal_amount;
  let deal_stage = req.body.deal_stage;
  let deal_close_date = req.body.deal_close_date;
  let deal_progress = req.body.deal_progress;
  let deal_type = req.body.deal_type;
  let deal_owner = req.body.deal_owner;

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
      res.send({
        result: true,
        msg: "Deal created successfully",
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
  var sql =
    "UPDATE deal_info SET deal_progress = '" +
    deal_progress +
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
    var sql =
      "UPDATE deal_info SET deal_stage = '" +
      deal_stage +
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
  













module.exports = router;
