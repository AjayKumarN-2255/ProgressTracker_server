const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Report = require('../../models/Report');
const { getDateRange } = require('../../utils/getDateRange');
const mongoose = require('mongoose');

async function getReport(query, isNeedGrouping = false) {

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

    if (!isNeedGrouping) {
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

            .populate('milestones.noteId', 'text')
            .populate('patternsToAddress.noteId', 'text')
            .populate('memos.noteId', 'text')
            .sort({ reviewMonth: -1 });

        return reports;
    }

    const matchStage = {
        ...(rId && { _id: new mongoose.Types.ObjectId(rId) }),
        ...(userId && { employeeId: new mongoose.Types.ObjectId(userId) }),
        ...(pId && { projectId: new mongoose.Types.ObjectId(pId) }),
        ...(startDate && endDate && {
            reviewMonth: { $gte: startDate, $lte: endDate }
        })
    };

    const reports = await Report.aggregate([
        { $match: matchStage },

        /* POPULATE employee */
        {
            $lookup: {
                from: 'users',
                let: { empId: '$employeeId' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$empId'] }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            name: 1
                        }
                    }
                ],
                as: 'employee'
            }
        },
        {
            $unwind: '$employee'
        },

        /* POPULATE reviewer */
        {
            $lookup: {
                from: 'users',
                let: { reviewerId: '$reviewerId' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$reviewerId'] }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            name: 1
                        }
                    }
                ],
                as: 'reviewer'
            }
        },
        {
            $unwind: '$reviewer'
        },
        /* POPULATE project */
        {
            $lookup: {
                from: 'projects',
                let: { projectId: '$projectId' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$projectId'] }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            name: 1
                        }
                    }
                ],
                as: 'project'
            }
        },
        { $unwind: '$project' },

        {
            $project: {
                _id: 1,
                reviewMonth: 1,
                milestones: 1,
                patternsToAddress: 1,
                memos: 1,
                employee: 1,
                reviewer: 1,
                project: 1
            }
        },

        /* GROUP BY MONTH */
        {
            $group: {
                _id: '$reviewMonth',
                reports: { $push: '$$ROOT' }
            }
        },

        { $sort: { _id: -1 } }
    ]);
    return reports;
}

module.exports = {
    getReport
};
