const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("game");
});

app.get("/topics", function(req,res){
  res.render("topics");
});

app.get("/game", function(req,res){
  res.render("game");
});

app.post("/game", function(req,res){

  // if(userAns === correctAns){
  //   res.redirect("/success")
  // } else {
  //   res.redirect("/game");
  //  code to make another attempt
  // }

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
