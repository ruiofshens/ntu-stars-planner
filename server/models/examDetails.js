import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const examSchema = Schema({
  examDate: Date, // also includes start time. day of week should be obtainable as well. note to care for timezone
  endTime: Date, 
  courseCode: String,
  courseTitle: String,
  duration: String,
});

const ExamModel = mongoose.model('ExamModel', examSchema);

export default ExamModel;