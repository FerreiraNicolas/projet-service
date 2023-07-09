const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require('./bookRoutes');
// Import other routes as needed

const app = express();
app.use(bodyParser.json());

app.use(bookRoutes);
// Use other routes as needed

app.listen(3003, () => {
    console.log("Book Microservice listening on port 3003");
});
