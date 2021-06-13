import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import courseRoutes from './routes/courseRouter.js'

//General Setup
const app = express();
dotenv.config(); //Allow use of env variables
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors()); //Use CORS package
app.use('/courses', courseRoutes); //Use Express.js, pass in router with our defined routes


/* Heroku can automatically populate process.env.PORT */
const PORT = process.env.PORT || 5000;


/* Setup a connection to database
If connection successful, call app.listen()
If connection unsuccessful, log error */
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

// temp solution

// import { addCoursesToDB } from './scrapper/getCourses.js';
// import { addExamsToDB } from './scrapper/getExams.js';
// await addCoursesToDB();
// await addExamsToDB();

// import { getTimetables } from './timetables/generator.js';
// let courses = ["CY1308", "EE8084"];
// getTimetables(courses);
