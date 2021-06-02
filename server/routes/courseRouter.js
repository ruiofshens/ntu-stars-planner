import express from 'express';

//Named imports instead of default imports used
import { getCourses } from '../controllers/courseHandlers.js';

//Setup router
const router = express.Router();

//Add routes
//Prefix of /posts added
router.get('/', getCourses);

export default router;