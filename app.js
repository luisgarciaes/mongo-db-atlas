require("dotenv").config();
const Person = require("./src/models/person");
console.log(process.env.TESTING);
require("./database");
const express = require("express");
var app = express();

app.set("view engine", "ejs");

var port = 3000;

app.use("/assets", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

app.use("/", function (req, res, next) {
  console.log("Request  Url" + req.url);
  next();
});

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/person/:id", function (req, res) {
  res.render("person", {
    ID: req.params.id,
    SMS: req.query.message,
    TIME: req.query.time,
  });
});

app.get("/api", function (req, res) {
  res.json({
    firstName: "Luis",
    lastName: "Espinoza",
  });
});

app.get("/student", function (req, res) {
  res.render("index");
});

app.post("/student", async (req, res) => {
  const { fname, lname } = req.body;
  const newPerson = new Person({ firstName: fname, lastName: lname });
  console.log(newPerson);
  await newPerson.save();
  res.send(`First name is: ${fname} Last name is: ${lname}`);
  console.log(req.body);
});

app.listen(port);
