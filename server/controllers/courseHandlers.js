/* Handlers for the routes
Keep the code for the routes shorter by shifting the handlers to this seperate file */

import mongoose from 'mongoose';

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