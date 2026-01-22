const authRouter = require('../routes/authRouter');


function routerLoader(app) {
    app.use('/api/auth', authRouter);
}

module.exports = {
    routerLoader
}