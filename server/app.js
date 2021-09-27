require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const api = require("./routes");
const bodyParser = require('body-parser');
const { application } = require('express');


// initialise express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// setup database connection
mongoose.connect("mongodb+srv://atom:admin123@cluster0.3ptd2.mongodb.net/jwt-refresh-token").then(() => console.log("Database connected"))
.catch(err => console.error(err));

// setup routes
app.get("/", (req, res) => {
    return res.status(200).send("ok");
});
app.use("/api",api);

// start server and listen on port 4000
app.listen(8080, () => console.log("Server Running on port 4000"));

