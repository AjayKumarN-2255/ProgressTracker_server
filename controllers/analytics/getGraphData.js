const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const analyticService = require('../../services/analytics');


async function getGraphData(req, res, next) {

    const { userId, month, year } = req.query;


    if (!userId) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, "select a user"));
    }

    if (!year) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, "select a year"));
    }

    const yearNum = Number(year);
    if (!Number.isInteger(yearNum) || yearNum < 2000 || yearNum > 2100) {
        return next(
            new APIError(STATUS_CODES.BAD_REQUEST, "invalid year")
        );
    }

    if (month !== undefined) {
        const monthNum = Number(month);
        if (!Number.isInteger(monthNum) || monthNum < 0 || monthNum > 11) {
            return next(
                new APIError(
                    STATUS_CODES.BAD_REQUEST,
                    "month must be between 0 and 11"
                )
            );
        }
    }

    try {

        let graphData;
        if (month) {
            graphData = await analyticService.getMonthWiseData(userId, month, year);
        } else {
            graphData = await analyticService.getYearWiseData(userId, year);
        }

        res.status(STATUS_CODES.OK).json({
            success: true,
            message: "graph data fetched successfully",
            data: graphData
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getGraphData
}