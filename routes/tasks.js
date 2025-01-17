const express = require("express");
const db = require("../Connection/db");
const router = express.Router();
const empty = "";
let helper = require("../Helper/helper");

// Task insert
router.post("/create_task", function (req, res) {
  let task_title = req.body.task_title;
  let task_type = req.body.task_type;
  let task_date = req.body.task_date;
  let queue_code = req.body.queue_code;
  let task_owner = req.body.task_owner;
  let link_name = req.body.link_name;
  let task_code = helper.makeid(15);
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  sql =
    "INSERT INTO tasks (task_code, task_title, task_type, task_date, queue_code,task_owner,status, create_date,update_date ) VALUES ('" +
    task_code +
    "', '" +
    task_title +
    "','" +
    task_type +
    "','" +
    task_date +
    "','" +
    queue_code +
    "','" +
    task_owner +
    "','" +
    "pending" +
    "','" +
    today +
    "','" +
    today +
    "')";

  db.query(sql, function (err, result) {
    if (!err) {
      sql2 =
        "INSERT INTO tasks_details (task_code, link_code, link_type,link_name,create_date,update_date ) VALUES ('" +
        task_code +
        "', '" +
        task_owner +
        "','" +
        "owner" +
        "','" +
        link_name +
        "','" +
        today +
        "','" +
        today +
        "')";

      db.query(sql2, function (err, result) {
        if (!err) {
          res.send({
            result: true,
            task_code: task_code,
            msg: "Task Inserted successfully",
          });
        } else {
          res.send({
            result: false,
            msg: "Task insertion failed",
            error: err,
          });
        }
      });
    } else {
      res.send({
        result: false,
        msg: "Task creation failed",
        error: err,
      });
    }
  });
});

// Get All Task
router.get("/tasks", (req, res) => {
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  db.query("SELECT * FROM tasks", (err, rows, fields) => {
    if (!err) {
      res.send({
        result: true,
        msg: "Tasks Found",
        data: rows,
      });
    } else {
      res.send({
        result: false,
        msg: "Sorry no data found",
        error: err,
      });
    }
  });
});

// Get all assigned deals
router.post("/task_list", (req, res) => {
  //Inner join Examples
  // https://www.mysqltutorial.org/mysql-inner-join.aspx/
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  db.query(
    "SELECT * FROM tasks INNER JOIN tasks_details USING (task_code) WHERE link_code = ?",
    [req.body.link_code],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "Tasks Found",
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

// Get all assigned deals
router.post("/upcoming_task", (req, res) => {
  //Inner join Examples
  // https://www.mysqltutorial.org/mysql-inner-join.aspx/
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  var date = helper.formatDate(new Date());
  console.log(date);

  db.query(
    "SELECT * FROM tasks INNER JOIN tasks_details USING (task_code) WHERE link_code = ? AND task_date >= ? ORDER BY task_date LIMIT 2",
    [req.body.link_code, date],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "Tasks Found",
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

// Get all assigned deals
router.post("/tasks_user_list", (req, res) => {
  //Inner join Examples
  // https://www.mysqltutorial.org/mysql-inner-join.aspx/
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  db.query(
    "SELECT * FROM tasks_details INNER JOIN tasks USING (task_code) WHERE task_code = ?",
    [req.body.task_code],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "Tasks Found",
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

// Get User Details
router.post("/task_details", (req, res) => {
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  db.query(
    "SELECT * FROM tasks WHERE task_code = ?",
    [req.body.task_code],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "Tasks Found",
          data: rows[0],
        });
      } else {
        res.send({
          result: false,
          msg: "No task found",
          error: err,
        });
      }
    }
  );
});

// Get User Details
router.post("/task_list_user", (req, res) => {
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  db.query(
    "SELECT * FROM tasks WHERE task_owner = ?",
    [req.body.task_owner],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          result: true,
          msg: "Tasks Found",
          data: rows,
        });
      } else {
        res.send({
          result: false,
          msg: "No task found",
          error: err,
        });
      }
    }
  );
});

// Update Task Status
router.put("/task_status_update", function (req, res) {
  let task_code = req.body.task_code;
  let status = req.body.status;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  var sql =
    "UPDATE tasks SET status = '" +
    status +
    "',update_date = '" +
    today +
    "' WHERE task_code = '" +
    task_code +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Task status updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Task status update Failed",
        error: err,
      });
    }
  });
});

// Delete Task
router.delete("/delete_task", function (req, res) {
  let task_code = req.body.task_code;
  let task_owner = req.body.task_owner;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  mQuery =
    "DELETE FROM tasks WHERE task_code = '" +
    task_code +
    "' AND task_owner = '" +
    task_owner +
    "' ";

  db.query(mQuery, function (err, result) {
    if (!err) {
      if (result["affectedRows"] > 0) {
        res.send({
          result: true,
          msg: "Task deleted successfully",
          res: result,
        });
      } else {
        res.send({
          result: false,
          msg: "Only task creator can delete task",
          res: result,
        });
      }
    } else {
      res.send({
        result: false,
        msg: "Task deletion failed",
      });
    }
  });
});

// Delete Task
router.post("/delete_task_user", function (req, res) {
  let link_code = req.body.link_code;
  let task_code = req.body.task_code;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  mQuery =
    "DELETE FROM tasks_details WHERE link_code = '" +
    link_code +
    "' AND task_code = '" +
    task_code +
    "' ";

  db.query(mQuery, function (err, result) {
    if (!err) {
      if (result["affectedRows"] > 0) {
        res.send({
          result: true,
          msg: "Task's user deleted successfully",
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

// Task insert
router.post("/task_details_add", function (req, res) {
  let task_code = req.body.task_code;
  let link_code = req.body.link_code;
  let link_type = req.body.link_type;
  let link_name = req.body.link_name;
  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  db.query(
    "SELECT * FROM tasks_details WHERE task_code = ? AND link_code = ?",
    [task_code, link_code],
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
            "INSERT INTO tasks_details (task_code, link_code, link_type, link_name, create_date,update_date ) VALUES ('" +
            task_code +
            "', '" +
            link_code +
            "','" +
            link_type +
            "','" +
            link_name +
            "','" +
            today +
            "','" +
            today +
            "')";
          db.query(sql, function (err, result) {
            if (!err) {
              res.send({
                assign: true,
                msg: "Task user assigned successfully",
              });
            } else {
              res.send({
                result: false,
                assign: false,
                msg: "Task user assign failed",
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
});

//Task Updateee
router.put("/task_details_update", function (req, res) {
  let task_code = req.body.task_code;
  let task_title = req.body.task_title;
  let task_type = req.body.task_type;
  let task_date = req.body.task_date;
  let status = req.body.status;

  const today = new Date().toISOString().slice(0, 19).replace("T", " ");

  var sql =
    "UPDATE tasks SET status = '" +
    status +
    "',task_title = '" +
    task_title +
    "',task_type = '" +
    task_type +
    "',task_date = '" +
    task_date +
    "', update_date = '" +
    today +
    "' WHERE task_code = '" +
    task_code +
    "'";
  db.query(sql, function (err, result) {
    if (!err) {
      res.send({
        result: true,
        msg: "Task updated successfully",
      });
    } else {
      res.send({
        result: false,
        msg: "Task update Failed",
        error: err,
      });
    }
  });
});

module.exports = router;
