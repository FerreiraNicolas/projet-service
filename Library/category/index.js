const express = require("express");
const bodyParser = require("body-parser");
const categoryRoutes = require('./categoryRoutes');

const app = express();
app.use(bodyParser.json());

app.use(categoryRoutes);

app.listen(3001, () => {
    console.log("Category Microservice listening on port 3001");
});
