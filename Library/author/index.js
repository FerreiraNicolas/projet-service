const express = require("express");
const bodyParser = require("body-parser");
const authorRoutes = require("./authorRoutes");

const app = express();
app.use(bodyParser.json());

app.use(authorRoutes);

app.listen(3002, () => {
  console.log("Author Microservice listening on port 3002");
});
