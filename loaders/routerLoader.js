const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');
const projectRouter = require('../routes/projectRouter');

function routerLoader(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/project', projectRouter);
}

module.exports = {
    routerLoader
}