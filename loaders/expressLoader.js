const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config();
const { bodyParserHandler,
    fourOhFourHandler,
    globalErrorHandler
} = require('../shared/error/errorHandler');
const { routerLoader } = require('./routerLoader');

async function expressLoader(app) {

    app.use(cors({
        origin: process.env.FRONT_END_URL,
        credentials: true
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(bodyParserHandler);

    routerLoader(app);

    app.use(fourOhFourHandler);
    app.use(globalErrorHandler);
}

module.exports = {
    expressLoader
}