// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

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

  // test
  app.get("/test", isAuthenticated, (req, res) => {
    res.render("doc-render", { layout: "main" });
  });
<<<<<<< HEAD
=======

  app.get("/newdoc", isAuthenticated, (req, res) => {
    res.render("newdoc", { layout: "main" });
  });

  app.get("/docrender/:id", isAuthenticated, (req, res) => {
    res.render("doc-render", { layout: "main" });
  });
>>>>>>> f20ce2dafb20706ed0453b8d0304f4a0cbb6b74b

  app.get("/schedule", isAuthenticated, (req, res) => {
    res.render("schedule", { layout: "main" });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
