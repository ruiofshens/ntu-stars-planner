/* Handlers for the routes
Keep the code for the routes shorter by shifting the handlers to this seperate file */
import { getVacancies } from '../scrapper/getVacancies.js';

/* Import models */
import CourseModel from '../models/courseDetails.js';
import ExamModel from '../models/examDetails.js';
import AcadSemModel from '../models/acadSemDetails.js';

export const getAllCourses = async (req, res) => {
    try {
        const allCourses = await CourseModel.find(); //Finding something in a model is async
        res.status(200).json(allCourses); // res.json() is a Express.js function that sends a JSON response
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getCourses = async (req, res) => {
    try {
        const courseCodes = req.query.courseCodes.split(",");
        const courses = await CourseModel.find({ courseCode: { $in: courseCodes } });
        res.status(200).json(courses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVacanciesAndWaitlist = async (req, res) => {
    try {
        const courseCode = req.query.courseCode;
        const vacanciesAndWaitlist = await getVacancies(courseCode);

        res.json(vacanciesAndWaitlist);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const getExamDetails = async (req, res) => {
    // courseCodes must be sent as a query params separated by comma
    try {
        const courseCodes = req.query.courseCodes.split(",");
        const exams = []
        for (let courseCode of courseCodes) {
            const examDoc = await ExamModel.findOne({ courseCode });
            exams.push(examDoc);
        }

        res.json(exams);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const getAcadSemDetails = async (req, res) => {
    try {
        const acadSem = await AcadSemModel.find(); 
        res.status(200).json(acadSem[0]); // should only have one
    } catch (error) {
        res.status(500).json({ error });
    }
}