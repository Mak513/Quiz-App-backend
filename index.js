const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const { response } = require("express");
const database = require("mime-db");

// middleware config

const app = express();
app.use(express.json());
const port = process.env.PORT;
app.use(cors());

const mongoSchema = new mongoose.Schema({
  question: String,
  answers: [
    {
      answer: String,
      points: Number
    }
  ]
});

const Question = mongoose.model("MongoDB", mongoSchema, "questions");

// app.use(bodyParser.urlencoded({extended: true}));
console.log(process.env.DB_URI);
app.get('/', async (req, res) => {
    try {
      await mongoose.connect(process.env.DB_URI);
      const questions = await Question.find();
      res.json(questions);
      console.log(questions);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });
  mongoose.connect(process.env.DB_URI).then(() => {
    app.listen(port, () => {
      console.log(`Quizz-App  API in listen on http://localhost:${port}`);
    });
  });