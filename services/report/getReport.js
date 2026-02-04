const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Report = require('../../models/Report');
const { getDateRange } = require('../../utils/getDateRange');

async function getReport(query) {

    const { userId, type, year, value, pId, rId } = query;

    let startDate;
    let endDate;

    if (type) {
        const dateRange = getDateRange({ type, year, value });

        if (!dateRange) {
            throw new APIError(
                STATUS_CODES.BAD_REQUEST,
                'Invalid date filter parameters'
            );
        }

        startDate = dateRange.startDate;
        endDate = dateRange.endDate;
    }

    const filter = {
        ...(rId ? { _id: rId } : {}),
        ...(userId ? { employeeId: userId } : {}),
        ...(startDate && endDate && {
            reviewMonth: {
                $gte: startDate,
                $lte: endDate
            }
        }),
        ...(pId ? { projectId: pId } : {}),
    };

    const reports = await Report.find(filter)
        .populate('employeeId', 'name')
        .populate('reviewerId', 'name')
        .populate('projectId', 'name')
        .sort({ reviewMonth: -1 });

    return reports;
}

module.exports = {
    getReport
};
