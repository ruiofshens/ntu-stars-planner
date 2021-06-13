import express from 'express';

//Named imports instead of default imports used
import { getCourses, getTimetables, getVacanciesAndWaitlist } from '../controllers/starsController.js';

//Setup router
const router = express.Router();

//Add routes
//Prefix of /posts added
router.get('/', getCourses);
router.get('generate/', getTimetables);
router.get('vacancies/', getVacanciesAndWaitlist);

export default router;