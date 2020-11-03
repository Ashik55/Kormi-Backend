const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const empty = "";
let helper = require("../Helper/helper");

// Registration new User
router.post("/assign_deal", function (req, res) {
  let com_code = req.body.com_code;
  let deal_code = req.body.deal_code;
  let assigned_by = req.body.assigned_by;
  let assigned_to = req.body.assigned_to;
  let assigned_to_name = req.body.assigned_to_name;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
 
  db.query(
    "SELECT COUNT(*) FROM deal_assignment WHERE deal_code = ?",
    [deal_code],
    (err, result) => {
      if (!err) {
        var x = result[0];
        var count = x["COUNT(*)"];
        assignment_serial = count + 1;



        
  db.query(
    "SELECT * FROM deal_assignment WHERE deal_code = ? AND assigned_to = ?",
    [deal_code, assigned_to],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.send({
            result: true,
            assign: false,
            msg: "Tasks Found",
            data: rows,
          });
        } else {

          sql =
          "INSERT INTO deal_assignment (com_code, deal_code, assigned_by, assigned_to, assigned_to_name, assignment_serial,create_date ) VALUES ('" +
          com_code +
          "', '" +
          deal_code +
          "','" +
          assigned_by +
          "','" +
          assigned_to +
          "','" +
          assigned_to_name +
          "','" +
          assignment_serial +
          "','" +
          today +
          "')";

        db.query(sql, function (err, result) {
          if (!err) {
            res.send({
              result: true,
              assign:true,
              msg: "Deal Assigned successfully",
            });
          } else {
            res.send({
              result: false,
              assign:false,
              msg: "Deal assign failed",
              error: err,
            });
          }
        });

   
        }
      } else {
        res.send({
          result: false,
          assign: false,
          msg: "Sorry Something went wrong",
          error: err,
        });
      }
    }
  );




        
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
    "SELECT * FROM deal_assignment WHERE deal_code = ?  AND NOT (assigned_to = assigned_by)",
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



// Get all assigned deals
router.post("/assigned_deals_list", (req, res) => {
  //Inner join Examples
  // https://www.mysqltutorial.org/mysql-inner-join.aspx/
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
 

  db.query(
    "SELECT * FROM deal_assignment INNER JOIN deal_info USING (deal_code) WHERE assigned_to = ? ",
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




// Delete Task
router.post("/delete_deal_user", function (req, res) {
  let deal_code = req.body.deal_code;
  let assigned_to = req.body.assigned_to;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  mQuery =
    "DELETE FROM deal_assignment WHERE deal_code = '" +
    deal_code +
    "' AND assigned_to = '" +
    assigned_to +
    "' ";

  db.query(mQuery, function (err, result) {
    if (!err) {
      if (result["affectedRows"] > 0) {
        res.send({
          result: true,
          msg: "Deal's user deleted successfully",
          res: result,
        });
      } else {
        res.send({
          result: false,
          msg: "user not found",
          res: result,
        });
      }
    } else {
      res.send({
        result: false,
        msg: "Sorry something went wrong, task deletion failed",
      });
    }
  });
});




module.exports = router;
