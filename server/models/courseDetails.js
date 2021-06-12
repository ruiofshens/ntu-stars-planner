import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const lessonSchema = Schema({
    type: String,
    group: String,
    day: String,
    startTime: Date,
    endTime: Date,
    venue: String,
    teachingWeeks: String,
});

const indexSchema = Schema({
    indexNo: String,
    lessons: [lessonSchema]
});

const courseSchema = Schema({
    courseName: String, // String is shorthand for {type: String}
    courseCode: String,
    courseAUs: String,
    indexes: [indexSchema]
});

//Convert schema to a model
const CourseModel = mongoose.model('CourseModel', courseSchema);

export default CourseModel;