const mysql = require("mysql");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const _ = require("lodash");
var multer, storage, path, crypto;
multer = require("multer");
path = require("path");
crypto = require("crypto");
var http = require("http").Server(app);
var io = require("socket.io")(http);

const db = require("./Connection/db");
const empty = "";
let helper = require("./Helper/helper");


const today = new Date().toISOString();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/*+json" }));


// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);


//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static("uploads"));
// app.listen(3001);



app.get("/web", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});




//Connecting all Routesss

const adminRouter = require("./Routes/adminLogin");
app.use("/", adminRouter);


const attendanceRouter = require("./Routes/attendance");
app.use("/", attendanceRouter);

const userRoute = require("./Routes/user");
app.use("/", userRoute);

const companyRoute = require("./Routes/company_central");
app.use("/", companyRoute);

const companyTempRoute = require("./Routes/company_temp");
app.use("/", companyTempRoute);

const departmentRoutes = require("./Routes/department");
app.use("/", departmentRoutes);

const LocationHistoryRoutes = require("./Routes/location_history");
app.use("/", LocationHistoryRoutes);

const DealInfoRoute = require("./Routes/deal_info");
app.use("/", DealInfoRoute);

const DealAssignmentRoute = require("./Routes/deal_assignment");
app.use("/", DealAssignmentRoute);

const tasksRouter = require("./Routes/tasks");
app.use("/", tasksRouter);


const commentRouter = require("./Routes/comment");
app.use("/", commentRouter);




app.get('/test', function(req ,res){
    res.send('ashik '+ today);
});



//Sockettt

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
    "INSERT INTO comment (deal_code, comment,comment_code, user_id, user_name ) VALUES ('" +
    commentObj.deal_code +
    "', '" +
    commentObj.comment +
    "','" +
    comment_code +
    "','" +
    commentObj.user_id +
    "','" +
    commentObj.user_name +
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
    "INSERT INTO comment_child (comment_code, comment_text, user_id, user_name) VALUES ('" +
    commentObj.comment_code +
    "', '" +
    commentObj.comment +
    "','" +
    commentObj.user_id +
    "','" +
    commentObj.user_name +
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








http.listen(3001, function () {
  console.log("Listening on 3001");
});

