// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const { Sequelize } = require("sequelize");

module.exports = function(app) {
  // These pages are rendered with the appropriate handlebars.
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

  app.get("/newdoc", isAuthenticated, (req, res) => {
    res.render("newdoc", { layout: "main", user: req.user });
  });

  // This request finds a document in the database by its ID and renders it on the page, with the option of "adding a grade" for teachers.
  app.get("/docrender/:id", isAuthenticated, (req, res) => {
    db.Document.findOne({
      where: { id: req.params.id },
      include: db.User,
    }).then((homework) => {
      res.render("doc-render", {
        layout: "main",
        user: req.user,
        homework: homework,
      });
    });
  });

  // This request finds a document in the database by its ID and renders it on the page. It is the version students can view.
  app.get("/docstudent/:id", isAuthenticated, (req, res) => {
    db.Document.findOne({
      where: { id: req.params.id },
      include: db.User,
    }).then((document) => {
      res.render("doc-student", {
        layout: "main",
        user: req.user,
        document: document,
      });
    });
  });

  // This request pulls documents and sessions from the database and renders them on the dashboard.
  app.get("/dashboard", isAuthenticated, (req, res) => {
    db.Session.findAll({
      where: { studentRequestingId: req.user.id },
    }).then((session) => {
      db.Document.findAll({
        include: { model: db.User, where: { id: req.user.id } },
      }).then((document) => {
        db.Document.findAll({
          where: { grade: { [Sequelize.Op.gte]: 89 } },
        }).then((topDocument) => {
          console.log("TOP DOC ran");
          console.log(req.user.firstName);
          res.render("dashboard", {
            layout: "main",
            user: req.user,
            session: session,
            topDocument: topDocument,
            document: document,
          });
        });
      });
    });
  });

  // This request finds all a user's sessions in the database.
  // app.get("/dashboard", isAuthenticated, (req, res) => {
  //   db.Session.findAll({
  //     where: { studentRequestingId: req.user.id }
  //   }).then(session => {
  //     console.log(session);
  //     res.render("dashboard", {
  //       layout: "main",
  //       user: req.user,
  //       session: session
  //     });
  //   });
  // });

  // // This request finds all a user's documents in the database.
  // app.get("/dashboard", isAuthenticated, (req, res) => {
  //   db.Document.findAll({
  //     include: { model: db.User, where: { id: req.user.id } }
  //   }).then(document => {
  //     console.log(document);
  //     res.render("dashboard", {
  //       layout: "main",
  //       user: req.user,
  //       document: document
  //     });
  //   });
  // });

  // // This request finds all the top documents in the database.
  // app.get("/dashboard", isAuthenticated, (req, res) => {
  //   db.Document.findAll({
  //     where: { grade: { [Sequelize.Op.gte]: 89 } }
  //   }).then(topDocument => {
  //     console.log("TOP DOC ran");
  //     res.render("dashboard", {
  //       layout: "main",
  //       user: req.user,
  //       topDocument: topDocument
  //     });
  //   });
  // });

  // This request finds all the homework documents in the database and displays them for the teacher.
  app.get("/teacher-dashboard", isAuthenticated, (req, res) => {
    db.Document.findAll({
      where: { documentType: "homework" },
      include: { model: db.User },
    }).then((homework) => {
      console.log(homework);
      res.render("teacher", {
        layout: "main",
        user: req.user,
        homework: homework,
      });
    });
  });

  // This request finds all the documents and grade and displays them for the teacher.
  app.get("/gradebook", isAuthenticated, (req, res) => {
    console.log(req.user);
    db.Document.findAll({
      where: { documentType: "homework" },
      include: { model: db.User, where: { teacherId: req.user.id } },
    }).then((homework) => {
      console.log(homework);
      res.render("gradebook", {
        layout: "main",
        user: req.user,
        homework: homework,
      });
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
