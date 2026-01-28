const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');
const projectRouter = require('../routes/projectRouter');
const reviewRouter = require('../routes/reviewRouter');

function routerLoader(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/review', reviewRouter);
    app.use('/api/project', projectRouter);
}

module.exports = {
    routerLoader
}