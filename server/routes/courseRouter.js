import express from 'express';

//Named imports instead of default imports used
import { getAllCourses, getCourses, getExamDetails, getVacanciesAndWaitlist, getAcadSemDetails } from '../controllers/starsController.js';

//Setup router
const router = express.Router();

//Add routes
//Prefix of /posts added
router.get('/', getAllCourses);
router.get('/courses/', getCourses);
// router.get('/generate/', getTimetables);
router.get('/vacancies/', getVacanciesAndWaitlist);
router.get('/exams/', getExamDetails);
router.get('/acadSem/', getAcadSemDetails);

export default router;