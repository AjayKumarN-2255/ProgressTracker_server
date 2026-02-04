const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Report = require('../../models/Report');

async function editReport(rId, payload) {

    const report = await Report.findById(rId);
    if (!report) {
        throw new APIError(
            STATUS_CODES.NOT_FOUND,
            'Report not found'
        );
    }

    const allowedUpdates = {
        milestones: payload.milestones,
        patternsToAddress: payload.patternsToAddress,
        memos: payload.memos
    };

    Object.keys(allowedUpdates).forEach(key => {
        if (allowedUpdates[key] !== undefined) {
            report[key] = allowedUpdates[key];
        }
    });

    await report.save();
}

module.exports = {
    editReport
}