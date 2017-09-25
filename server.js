const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

// add a new projects page - link to github projhects
//create 'projects' url in & page in view file 'portfolio page here'
//Add new link to header page for projects page
// then make commit & push to github & heroku remote

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("unable to append to server.log");
    }
  });
  next();
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my website"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects",
    welcomeMessage: "See my projects here"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to reach address"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
