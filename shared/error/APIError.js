class APIError extends Error {

    constructor(status = 404, message = 'Internal server error') {
        super(message);
        this.status = status;
    }

    toJSON() {
        return {
            error: {
                status: this.status,
                message: this.message
            }
        }
    }
}

module.exports = {
    APIError
}