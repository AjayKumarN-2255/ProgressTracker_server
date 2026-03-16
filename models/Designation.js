const mongoose = require('mongoose');

const DesignationSchema = new mongoose.Schema({
    name: String,
    role: {
        type: String,
        enum: ["admin", "employee"]
    }
});

module.exports = mongoose.model('Designation', DesignationSchema);