const authRouter = require('../routes/authRouter');


async function routerLoader(app) {
    app.use('/api/auth', authRouter);
}

module.exports = {
    routerLoader
}