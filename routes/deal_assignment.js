const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const today = new Date().toISOString().slice(0, 19).replace("T", " ");
const empty = "";
let helper = require("../Helper/helper");

// Registration new User
router.post("/assign_deal", function (req, res) {
  let com_code = req.body.com_code;
  let deal_code = req.body.deal_code;
  let assigned_by = req.body.assigned_by;
  let assigned_to = req.body.assigned_to;

  db.query(
    "SELECT COUNT(*) FROM deal_assignment WHERE deal_code = ?",
    [deal_code],
    (err, result) => {
      if (!err) {
        var x = result[0];
        var count = x["COUNT(*)"];
        assignment_serial = count + 1;

        sql =
          "INSERT INTO deal_assignment (com_code, deal_code, assigned_by, assigned_to, assignment_serial,create_date ) VALUES ('" +
          com_code +
          "', '" +
          deal_code +
          "','" +
          assigned_by +
          "','" +
          assigned_to +
          "','" +
          assignment_serial +
          "','" +
          today +
          "')";

        db.query(sql, function (err, result) {
          if (!err) {
            res.send({
              result: true,
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
          msg: "Sorry something went wrong",
          error: err,
        });
      }
    }
  );
});

// Get All Deals
router.get("/all_assigned_deals", (req, res) => {
  db.query("SELECT * FROM deal_assignment", (err, rows, fields) => {
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

// Get User of same Deal
router.post("/assign_deal_list_deal_code", (req, res) => {
  db.query(
    "SELECT * FROM deal_assignment WHERE deal_code = ?",
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

// // Get all assigned deals
// router.post("/assigned_deals_list", (req, res) => {
//   db.query(
//     "SELECT * FROM deal_assignment WHERE assigned_to = ?",
//     [req.body.assigned_to],
//     (err, rows, fields) => {
//       if (!err) {
//         res.send({
//           result: true,
//           msg: "Deal Found",
//           data: rows,
//         });
//       } else {
//         res.send({
//           result: false,
//           msg: "Sorry something went wrong",
//           error: err,
//         });
//       }
//     }
//   );
// });

// Get all assigned deals
router.post("/assigned_deals_list", (req, res) => {
  db.query(
    "SELECT * FROM deal_assignment INNER JOIN deal_info USING (deal_code) WHERE assigned_to = ?",
    [req.body.assigned_to],
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

// Get all deals of a company
router.get("/assign_deal_list_com", (req, res) => {
  db.query(
    "SELECT * FROM deal_assignment WHERE com_code = ?",
    [req.body.com_code],
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

// Get deal count
router.get("/assign_deal_list_deal_code_count", (req, res) => {
  db.query(
    "SELECT COUNT(*) FROM deal_assignment WHERE deal_code = ?",
    [req.body.deal_code],
    (err, result) => {
      if (!err) {
        var x = result[0];
        var count = x["COUNT(*)"];

        res.send({
          result: true,
          msg: "Deal Found",
          count: count,
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

module.exports = router;
