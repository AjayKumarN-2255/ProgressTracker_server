const { APIError } = require('./APIError');
const { STATUS_CODES } = require('../constants/statusCodes');

function bodyParserHandler(err, req, res, next) {
    if ((err instanceof SyntaxError) || (err instanceof TypeError)) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, "Malformed JSON."));
    }
    next()
}

function fourOhFourHandler(req, res, next) {
    return next(new APIError(STATUS_CODES.NOT_FOUND, `${req.path} is not valid path to a resource.`));
}

function fourOhFiveHandler(req, res, next) {
    return next(new APIError(STATUS_CODES.METHOD_NOT_ALLOWED, `${req.method} method is not supported at ${req.path}.`));
}

function globalErrorHandler(err, req, res, next) {

    let error = err;
    if (!(error instanceof APIError)) {
        error = new APIError(STATUS_CODES.INTERNAL_SERVER_ERROR, err.message);
    }

    res
        .status(error.status)
        .json({
            success: false,
            message: error.message
        })
}


module.exports = {
    bodyParserHandler,
    fourOhFourHandler,
    fourOhFiveHandler,
    globalErrorHandler
}