const authRouter = require('../routes/authRouter');
const projectRouter = require('../routes/projectRouter');

function routerLoader(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/project', projectRouter);
}

module.exports = {
    routerLoader
}