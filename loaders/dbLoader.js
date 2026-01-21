const mongoose = require('mongoose');

async function connection() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected successfully");
    } catch (error) {
        console.log(error)
        console.log("database connection failed");
    }
}

module.exports = {
    connection
}