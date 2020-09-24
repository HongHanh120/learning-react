const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

// generate app object
const app = express();

const PORT = process.env.PORT || 5000;

// telling the app that we are going to use json to handle incoming payload
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const todo = require('./routes/todo');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());
app.use('/api/v1/todos', todo);

app.use("/ping", (req, res) => {
    res.send("pong");
});

mongoose.connect("mongodb://localhost:27017/todo", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        });
    })
    .catch((err) => console.error(err.message));

app.use((req, res, next) => {
    next(createError(404))
});

app.use(function (err, req, res, next) {
    console.log(err.message);
    if (!err.statusCode) err.stateCode = 500;
    res.status(err.statusCode).send(err.message);
});

