import mongoose from 'mongoose';

//Each schema maps to a MongoDB collection
const courseSchema = mongoose.Schema({
    name: String, // String is shorthand for {type: String}
    code: String,
    school: String,
    vacancy: Number,
    waitlist: {
        type: Number,
        default: 0
    },
});

//Convert schema to a model
const CourseModel = mongoose.model('CourseModel', postSchema);

export default CourseModel;