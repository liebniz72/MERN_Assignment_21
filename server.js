const { readdirSync } = require("fs");
const express = require('express');
const app = express();
require("dotenv").config();
const apiRouter = require('./routes/api');

// Security Middleware
const helmet = require('helmet');
const cors = require('cors');


// Database Middleware
const mongoose = require("mongoose");


// Security Middlewares Implement
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());


// Routes middleware
app.use('/api', apiRouter);


// Server
const port = process.env.PORT || '8000';

// Connect to DB and start server
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Running on port http://localhost:${port}`);
        });
    })
    .catch((err) => console.log(err));