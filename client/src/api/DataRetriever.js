import axios from 'axios';

const url = "http://localhost:5000/courses/";

export const fetchCourses = async () => {
     
    try {
        return await axios.get(url);
    }
    catch (error) {
        console.log(error.message);
    }
    
 }


export const fetchTimetablePlans = async (courseCodes) => {

    try {
        return await axios.get(url + "generate?courseCodes=" + courseCodes.join(','));
    }
    catch(error) {
        console.log(error.message);
    }

}

export const fetchVacanciesAndWaitlist = async (courseCode) => {
    try {
        return await axios.get(url + "vacancies?courseCode=" + courseCode);
    } catch (error) {
        console.log(error.message);
    }
}