// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const { Sequelize } = require("sequelize");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index", { layout: "main" });
  });

  app.get("/login", (req, res) => {
    res.render("login", { layout: "main" });
  });

  app.get("/signup", (req, res) => {
    res.render("signup", { layout: "main" });
  });

  app.get("/schedule", isAuthenticated, (req, res) => {
    res.render("schedule", { layout: "main", user: req.user });
  });

  // render a document
  app.get("/docrender/:id", isAuthenticated, (req, res) => {
    db.Document.findOne({
      where: { id: req.params.id },
      include: db.User
    }).then(homework => {
      res.render("doc-render", {
        layout: "main",
        user: req.user,
        homework: homework
      });
    });
  });

  app.get("/docstudent/:id", isAuthenticated, (req, res) => {
    db.Document.findOne({
      where: { id: req.params.id },
      include: db.User
    }).then(document => {
      res.render("doc-student", {
        layout: "main",
        user: req.user,
        document: document
      });
    });
  });

  app.get("/newdoc", isAuthenticated, (req, res) => {
    res.render("newdoc", { layout: "main", user: req.user });
  });

  app.get("/schedule", isAuthenticated, (req, res) => {
    res.render("schedule", { layout: "main", user: req.user });
  });

  // app.get("/dashboard", isAuthenticated, (req, res) => {
  //   res.render("dashboard", { layout: "main", user: req.user });
  // });

  // app.get("/dashboard", isAuthenticated, (req, res) => {
  //   db.Session.findAll({
  //     include: { model: db.User, where: { id: req.user.id } }
  //   }).then(session => {
  //     console.log(session);
  //     res.render("dashboard", {
  //       layout: "main",
  //       user: req.user,
  //       session: session
  //     });
  //   });
  // });

  app.get("/dashboard", isAuthenticated, (req, res) => {
    db.Document.findAll({
      // where: { documentType: "homework" } || { documentType: "note" },
      include: { model: db.User, where: { id: req.user.id } }
    }).then(document => {
      console.log(document);
      res.render("dashboard", {
        layout: "main",
        user: req.user,
        document: document
      });
    });
  });

  app.get("/dashboard", isAuthenticated, (req, res) => {
    db.Document.findAll({
      where: { grade: { [Sequelize.Op.gte]: 89 } }
    }).then(topDocument => {
      console.log("TOP DOC ran");
      res.render("dashboard", {
        layout: "main",
        user: req.user,
        topDocument: topDocument
      });
    });
  });

  app.get("/teacher-dashboard", isAuthenticated, (req, res) => {
    db.Document.findAll({
      where: { documentType: "homework" },
      include: { model: db.User }
      // where: { id: req.user.id } },
    }).then(homework => {
      console.log(homework);
      res.render("teacher", {
        layout: "main",
        user: req.user,
        homework: homework
      });
    });
  });

  app.get("/gradebook", isAuthenticated, (req, res) => {
    console.log(req.user);
    db.Document.findAll({
      where: { documentType: "homework" },
      include: { model: db.User, where: { teacherId: req.user.id } }
    }).then(homework => {
      console.log(homework);
      res.render("gradebook", {
        layout: "main",
        user: req.user,
        homework: homework
      });
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
