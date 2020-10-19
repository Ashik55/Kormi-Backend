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



const jwt = require('jsonwebtoken');


// * * * * * *  * * * * * * * * * *  * * * * * * * * *  * * * * * * * * * * Aashiqqqq * * * * * * * * *  * * * * * * * * * *  * * * * * * * * *  * * * * * * * * * *  * * * * * * * * *  * * * * * * * * * *  * * *


//json WebToken


//Test post Request with token verification

app.post('/test/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
        //Token Verify Successfull Do whatever you want

      res.json({
        message: 'Post created successfully...'
      });
    }
  });
});


app.post('/ash/login', (req, res) => {
    
  // Mock user
  const user = {
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '365d' }, (err, token) => {
    res.json({
      token
    });
  });
});



// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {

  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
  
  




app.get('/test', function(req ,res){
    res.send('ashik '+ today);
});
