//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workitems = [];
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  let  today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);
  
  res.render("list", {KindOfDay: day,newlistitem: items});
});
app.post("/", function(req,res){
  let item = req.body.Newitem;
  if (req.body.button === "Work") {
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  
});
app.get("/work", function(req,res){
  res.render("list", {KindOfDay: "Work List",newlistitem: workitems});
});
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});
