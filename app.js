require('dotenv').config()
// const mysql = require("mysql2");
const express = require("express");
const dbConnection = require("./db/database");
const userRoute = require("./api/user/userRoute");
const questionRoute = require('./api/question/questionRoute');
const ansewrRoute = require('./api/answer/answer')
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const port = process.env.PORT;
const app = express();


app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/ansewrs", ansewrRoute);

async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    app.listen(port);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

start();
// app.listen(port, () => console.log(`Listening at http://localhost:${port}`));