const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
require('dotenv').config();
const { bodyParserHandler,
    fourOhFourHandler,
    globalErrorHandler
} = require('../shared/error/errorHandler');
const { routerLoader } = require('./routerLoader');

function expressLoader(app) {

    app.use(cors({
        origin: process.env.FRONT_END_URL,
        credentials: true,
        exposedHeaders: ['Content-Disposition']
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(bodyParserHandler);

    routerLoader(app);

    app.use('/uploads/profile', express.static(path.join(__dirname, '..', 'uploads/profile')));
    app.use(fourOhFourHandler);
    app.use(globalErrorHandler);
}

module.exports = {
    expressLoader
}