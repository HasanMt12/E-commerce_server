const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
// const morgan = require("morgan");

//configure env
dotenv.config();

//rest object
const app = express();

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "server is running"
  });
});

//PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue.white.bold
  );
});