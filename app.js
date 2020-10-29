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
app.listen(3001);





//Connecting all Routesss

const userRoute = require("./routes/user");
app.use("/", userRoute);

const companyRoute = require("./routes/company_central");
app.use("/", companyRoute);

const companyTempRoute = require("./routes/company_temp");
app.use("/", companyTempRoute);

const departmentRoutes = require("./routes/department");
app.use("/", departmentRoutes);

const LocationHistoryRoutes = require("./routes/location_history");
app.use("/", LocationHistoryRoutes);

const DealInfoRoute = require("./routes/deal_info");
app.use("/", DealInfoRoute);

const DealAssignmentRoute = require("./routes/deal_assignment");
app.use("/", DealAssignmentRoute);

const tasksRouter = require("./routes/tasks");
app.use("/", tasksRouter);

const attendanceRouter = require("./routes/attendance");
app.use("/", attendanceRouter);



app.get('/test', function(req ,res){
    res.send('ashik '+ today);
});
