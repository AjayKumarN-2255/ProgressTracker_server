const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');
const projectRouter = require('../routes/projectRouter');
const reviewRouter = require('../routes/reviewRouter');
const reportRouter = require('../routes/reportRouter');
const noteRouter = require('../routes/noteRouter');
const analyticRouter = require('../routes/analyticsRouter');
const desgnRouter = require('../routes/desgnRouter');

function routerLoader(app) {
    app.use((req, res, next) => {
        console.log("REQUEST:", req.method, req.url);
        next();
    });
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/note', noteRouter);
    app.use('/api/desgn', desgnRouter);
    app.use('/api/review', reviewRouter);
    app.use('/api/report', reportRouter);
    app.use('/api/project', projectRouter);
    app.use('/api/analytics', analyticRouter);
}

module.exports = {
    routerLoader
}