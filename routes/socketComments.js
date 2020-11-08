const express = require("express");
const app = express();
const db = require("../Connection/db");
const router = express.Router();
const empty = "";
let helper = require("../Helper/helper");

//newww
var http = require("http").Server(app);
var io = require("socket.io")(http);

io.on("connection", function (socket) {
  console.log("A user is connected");

  //call from client Side
  socket.on("add_root_comment", function (commentObj) {
    console.log("add root comment called " + commentObj);
    root_comment(commentObj, function (res, commentCode) {
      if (res) {
        io.emit("refresh_root", {
          id: 1,
          deal_code: commentObj.deal_code,
          comment_code: commentCode,
          comment: commentObj.comment,
          user_id: commentObj.user_id,
          user_name: commentObj.user_name,
        });
      } else {
        io.emit("error");
      }
    });
  });

  //call from client Side
  socket.on("add_child_comment", function (commentObj) {
    console.log("add child comment called  " + commentObj);
    child_Comment(commentObj, function (res) {
      if (res) {
        io.emit("refresh_child", {
          id: 1,
          deal_code: "",
          comment_code: commentObj.comment_code,
          comment: commentObj.comment,
          user_id: commentObj.user_id,
          user_name: commentObj.user_name,
        });
      } else {
        io.emit("error");
      }
    });
  });
});

var root_comment = function (commentObj, callback) {
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
  let comment_code = helper.makeid(20);
  sql =
    "INSERT INTO comment (deal_code, comment,comment_code, user_id, user_name, create_date ) VALUES ('" +
    commentObj.deal_code +
    "', '" +
    commentObj.comment +
    "','" +
    commentObj.comment_code +
    "','" +
    commentObj.user_id +
    "','" +
    commentObj.user_name +
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
              callback(true, comment_code);
              return;
            } else {
              callback(false,'');
              return;
            }
          } else {
            callback(false,'');
            return;
          }
        }
      );
    } else {
      callback(false);
      return;
    }
  });
};

var child_Comment = function (commentObj, callback) {
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");
  sql =
    "INSERT INTO comment_child (comment_code, comment_text, user_id, user_name, create_date ) VALUES ('" +
    commentObj.comment_code +
    "', '" +
    commentObj.comment_text +
    "','" +
    commentObj.user_id +
    "','" +
    commentObj.user_name +
    "','" +
    today +
    "')";
  db.query(sql, function (err, result) {
    if (!err) {
      callback(true);
      return;
    } else {
      callback(false);
      return;
    }
  });
};




module.exports = router;
