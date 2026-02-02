const Report = require('../../models/Report');


async function getReport(query) {

    const { userId } = query;

    const filter = {
        ...(userId ? { employeeId: userId } : {}),
    }

    const reports = await Report.find(filter)
        .populate('employeeId', 'name')
        .populate('reviewerId', 'name')
        .populate('projectId', 'name')
        .sort({ reviewMonth: -1 });

    return reports;
}

module.exports = {
    getReport
}