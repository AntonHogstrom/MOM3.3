const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
        unique: true
    },
    courseName: {
        type: String,
        required: true,
        unique: true
    },
    coursePeriod: {
        type: String,
        required: true,
        default: 666
    }
});

//collection using CourseSchema
module.exports = mongoose.model('course', CourseSchema);