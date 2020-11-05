const express = require("express");
const db = require("../Connection/db");
const router = express.Router();

const empty = "";
let helper = require("../Helper/helper");

//Create New Comments
router.post("/create_comment", function (req, res) {
  let deal_code = req.body.deal_code;
  let comment = req.body.comment;
  let user_id = req.body.user_id;
  let user_name = req.body.user_name;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
  let comment_code = helper.makeid(20);
  sql =
    "INSERT INTO comment (deal_code, comment,comment_code, user_id, user_name, create_date ) VALUES ('" +
    deal_code +
    "', '" +
    comment +
    "','" +
    comment_code +
    "','" +
    user_id +
    "','" +
    user_name +
    "','" +
    today +
    "')";
  db.query(sql, function (err, result) {
    if (!err) {
      db.query(
        "SELECT  `id`,`deal_code`,`comment_code`,`comment`,`user_id`,`user_name` FROM comment WHERE comment_code = ?",
        [comment_code],
        (err, rows, fields) => {
          if (!err) {
            if (rows.length > 0) {
              res.send({
                result: true,
                msg: "Comment added successfully",
                data: rows[0],
              });
            } else {
              res.send({
                result: false,
                msg: "Comments Not Found",
                data: [],
              });
            }
          } else {
            res.send({
              result: false,
              msg: "Sorry something went wrong",
              error: err,
            });
          }
        }
      );
    } else {
      res.send({
        result: false,
        msg: "Comment addition failed",
        error: err,
      });
    }
  });
});

// Get comments
router.post("/comments", (req, res) => {
  db.query(
    "SELECT * FROM comment WHERE deal_code = ?",
    [req.body.deal_code],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.send({
            result: true,
            msg: "Comments Found",
            data: rows,
          });
        } else {
          res.send({
            result: false,
            msg: "Comments Not Found",
            data: [],
          });
        }
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

// Registration new Deal
router.post("/create_comment_child", function (req, res) {
  let comment_code = req.body.comment_code;
  let comment_text = req.body.comment_text;
  let user_id = req.body.user_id;
  let user_name = req.body.user_name;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
  sql =
    "INSERT INTO comment_child (comment_code, comment_text, user_id, user_name, create_date ) VALUES ('" +
    comment_code +
    "', '" +
    comment_text +
    "','" +
    user_id +
    "','" +
    user_name +
    "','" +
    today +
    "')";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Comment chiled added successfully",
        data: {
          id: 1,
          deal_code: "",
          comment_code: comment_code,
          comment: comment_text,
          user_id: user_id,
          user_name: user_name,
        },
      });
    } else {
      res.send({
        result: false,
        msg: "Comment chiled addition failed",
        error: err,
      });
    }
  });
});

// Get User Details
router.post("/comments", (req, res) => {
  db.query(
    "SELECT * FROM comment_child WHERE comment_code = ?",
    [req.body.comment_code],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.send({
            result: true,
            msg: "Comments child Found",
            data: rows,
          });
        } else {
          res.send({
            result: false,
            msg: "Comments child Not Found",
            data: [],
          });
        }
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
router.post("/comment_list", (req, res) => {
  db.query(
    "SELECT `id`,`deal_code`,`comment_code`,`comment`,`user_id`,`user_name` FROM `comment` WHERE `deal_code`= ? union all SELECT id,'' , comment_code,comment_text, user_id, user_name  FROM comment_child where comment_code in(SELECT comment_code FROM `comment` WHERE `deal_code`=? )",
    [req.body.deal_code, req.body.deal_code],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "comment list Found",
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
