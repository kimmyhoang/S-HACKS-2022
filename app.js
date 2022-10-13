const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/finlingoDB")
main().catch(err => console.log(err))

async function main() {
  await mongoose.connect('mongodb://localhost:27017/finlingoDB');
}

//creating a schema
const finlingoSchema = new mongoose.Schema({
  questionType: String,
  question: String,
  answers: {
      a: String,
      b: String,
      c: String,
      d: String
  },
  correctAnswer: String,
  explanation: String
})

//creating a model
const Question = new mongoose.model("Question", finlingoSchema)

//creating a document
const q1 = new Question ({
  questionType: 'Debt Management',
  question: "How long is the grace period for student loans?",
  answers: {
      a: 'Usually 6 months after graduation',
      b: 'The government will give you unlimited time after you graduate',
      c: '4 months',
      d: '1 year'
  },
  correctAnswer: 'Correct!',
  explanation: 'Usually 6 months after graduation'  
})

const q2 = new Question ({
  questionType: 'Debt Management',
  question: "What are the disadvantages of refinancing student loans?",
  answers: {
      a: 'Lower monthly payments help your overall financial picture',
      b: 'Interest rates could decrease',
      c: 'Refinancing lets you alter your payment plan',
      d: 'You will lose your grace period for federal student loans'
  },
  correctAnswer: 'Correct!',
  explanation: 'You will lose your grace period for federal student loans'
})

const q3 = new Question ({
  questionType: 'Debt Management',
  question: "What is an RESP?",
  answers: {
      a: 'A savings account available to caregivers to save for post-secondary education',
      b: 'An account in which money can be set aside, tax free, throughout a lifetime',
      c: 'A transaction account allowing the deposit of money held at a financial institution',
      d: 'A high-yield savings account typically paying 20 to 25 times the national average'
  },
  correctAnswer: 'Correct!',
  explanation: 'Usually 6 months after graduation'  
})

//saving the document
// Question.insertMany([q1, q2, q3], function(err){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all questions to finlingoDB")
//   }
// });

//reading from a database with mongoose

Question.find(function(err, questions){
  if(err) {
    console.log(err);
  } else {

    mongoose.connection.close(function() {
      process.exit(0);
    });

    questions.forEach(function(question){
      console.log(question.question);
    })
  }
});


const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("topics");
});


app.get("/learn", function(req,res){
  res.render("learn");
});


app.get("/game", function(req,res){
  res.render("game");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
