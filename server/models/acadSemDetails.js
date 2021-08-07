import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const acadSem = Schema({
  year: String,
  sem: String
});

const AcadSemModel = mongoose.model('AcadSemModel', acadSem);

export default AcadSemModel;