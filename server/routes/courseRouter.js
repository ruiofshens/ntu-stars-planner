import express from 'express';

//Named imports instead of default imports used
import { getCourses, getTimetables } from '../controllers/starsController.js';

//Setup router
const router = express.Router();

//Add routes
//Prefix of /posts added
router.get('/', getCourses);
router.get('/generate/', getTimetables);

export default router;