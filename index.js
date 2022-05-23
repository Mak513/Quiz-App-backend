const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const { response } = require("express");

// middleware config

const app = express();
const port = process.env.PORT;
app.use(cors());
const mongoSchema = new mongoose.Schema({
    Fragen: String,
    a: String,
    b: String,
    c: String,
});
const MongoDB = mongoose.model("MongoDB", mongoSchema, "questions");

app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect(process.env.DB_URI);
app.use('/', async (req, res) => {
    try {
      const connection = await MongoDB.find().exec();
      res.json(questions);
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