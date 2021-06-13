/* Handlers for the routes
Keep the code for the routes shorter by shifting the handlers to this seperate file */
import TimetableGenerator from '../timetables/generator.js';

/* Import models */
import CourseModel from '../models/courseDetails.js';


export const getCourses = async (req, res) => {
    try {
        const allCourses = await CourseModel.find(); //Finding something in a model is async

        res.status(200).json(allCourses); // res.json() is a Express.js function that sends a JSON response
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getTimetables = async (req, res) => {
    // courseCodes must be sent as a query params separated by comma
    try {
        const courseCodes = req.query.courseCodes.split(",");
        const timetables = await TimetableGenerator(courseCodes); // { canGenerate: boolean, timetables: Array }
        
        res.json(timetables);
    } catch (error) {
        res.status(500).json({ error });
    }
  }