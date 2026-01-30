const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { validateWithSchema } = require('../../utils/schemaValidation');
const reportSchema = require('../../validators/reportSchema');
const reportService = require('../../services/report');


async function addReport(req, res, next) {
    const payload = req.body;
    const id = req.params.id;

    if (!payload) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }

    const { error } = validateWithSchema(reportSchema, payload);

    if (error) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, error.details[0].message));
    }

    const {
        milestones = [],
        patternsToAddress = [],
        memos = []
    } = payload;

    const isAllEmpty =
        milestones.length === 0 &&
        patternsToAddress.length === 0 &&
        memos.length === 0;

    if (isAllEmpty) {
        return next(new APIError(
            STATUS_CODES.BAD_REQUEST,
            'Please provide at least one feedback (Milestones, Patterns to Address, or Memos)'
        ));
    }

    try {
        await reportService.addReport(id, payload);

        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'Report added successfully'
        });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    addReport
}