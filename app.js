const express = require('express');
const app = express();
const { expressLoader } = require('./loaders/expressLoader');
const { connection } = require('./loaders/dbLoader');

async function Loader() {
    await expressLoader(app);
    await connection();
}

module.exports = {
    Loader,
    app
}