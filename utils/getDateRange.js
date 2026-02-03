

function getDateRange({ type, year, value }) {
    const y = Number(year) || new Date().getFullYear();

    let startDate;
    let endDate;

    switch (type) {
        case 'CURRENT': {
            const now = new Date();
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            break;
        }

        case 'MONTH': {
            if (value === null || value === undefined) return null;
            startDate = new Date(y, Number(value), 1);
            endDate = new Date(y, Number(value) + 1, 0);
            break;
        }

        case 'QUARTER': {
            const quarterMap = {
                Q1: [0, 2],
                Q2: [3, 5],
                Q3: [6, 8],
                Q4: [9, 11],
            };
            const range = quarterMap[value];
            if (!range) return null;

            startDate = new Date(y, range[0], 1);
            endDate = new Date(y, range[1] + 1, 0);
            break;
        }

        case 'HALF': {
            if (value === 'H1') {
                startDate = new Date(y, 0, 1);
                endDate = new Date(y, 6, 0);
            } else if (value === 'H2') {
                startDate = new Date(y, 6, 1);
                endDate = new Date(y, 12, 0);
            } else {
                return null;
            }
            break;
        }

        case 'YEAR': {
            startDate = new Date(y, 0, 1);
            endDate = new Date(y, 12, 0);
            break;
        }

        default:
            return null;
    }

    return { startDate, endDate };
}


module.exports = {
    getDateRange
}