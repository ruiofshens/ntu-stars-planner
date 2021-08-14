/* Handlers for the routes
Keep the code for the routes shorter by shifting the handlers to this seperate file */
import { getVacancies } from '../scrapper/getVacancies.js';
import { getCoursesFromNTU } from '../scrapper/getCourses.js';
import { getExamsFromNTU } from '../scrapper/getExams.js';


import fs from 'fs';

export const getAllCourses = async (req, res) => {
    try {
        // const allCourses = await CourseModel.find(); //Finding something in a model is async
        const jsonData = fs.readFileSync("scrapper/data/courses/courses.json");
        const allCourses = JSON.parse(jsonData);
        res.status(200).json(allCourses); // res.json() is a Express.js function that sends a JSON response
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getCourses = async (req, res) => {
    try {
        const courseCodes = req.query.courseCodes.split(",");
        const jsonData = fs.readFileSync("scrapper/data/courses/courses.json");
        const allCourses = JSON.parse(jsonData);
        const courses = allCourses.filter(course => courseCodes.includes(course.courseCode));
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
        const jsonData = fs.readFileSync("scrapper/data/exams/exams.json");
        const allExams = JSON.parse(jsonData);
        const exams = allExams.filter(exam => courseCodes.includes(exam.courseCode));
        res.json(exams);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const getAcadSemDetails = async (req, res) => {
    try {
        const jsonData = fs.readFileSync("scrapper/data/acadSem/acadSem.json");
        const acadSem = JSON.parse(jsonData);
        res.status(200).json(acadSem); // should only have one
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const doRefreshDatabase = async (req, res) => {
    try {
        let coursesDone = await getCoursesFromNTU();
        let examsDone = await getExamsFromNTU();
        if (coursesDone && examsDone) {
            res.status(200).json({success: "Database refreshed successfully."})
        } else {
            res.status(500).json({error: "An error occurred when refreshing the database."})
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const doRefreshCourses = async (req, res) => {
    try {
        let coursesDone = await getCoursesFromNTU();
        if (coursesDone) {
            res.status(200).json({success: "Courses refreshed successfully."})
        } else {
            res.status(500).json({error: "An error occurred when refreshing courses."});
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const doRefreshExams = async (req, res) => {
    try {
        let examsDone = await getExamsFromNTU("1", "2021-2022", "105", "2021");
        if (examsDone) {
            res.status(200).json({success: "Exams refreshed successfully."})
        } else {
            res.status(500).json({error: "An error occurred when refreshing exams."});
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}