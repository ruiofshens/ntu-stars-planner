import axios from 'axios';

const url = "http://localhost:5000/courses/";

export const fetchAllCourses = async () => {
     
    try {
        const { data } = await axios.get(url).data
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
    
 }

 export const fetchCourses = async (courseCodes) => {
    //courseCodes: array
    try {
        const { data } = await axios.get(url + "courses?courseCodes=" + courseCodes.join(","));
        return data;
    } catch (error) {
        console.log(error.message);
    }
 } 


// export const fetchTimetablePlans = async (courseCodes) => {

//     try {
//         courseCodes = courseCodes.filter(courseCode => courseCode);
//         return await axios.get(url + "generate?courseCodes=" + courseCodes.join(','));
//     }
//     catch(error) {
//         console.log(error.message);
//     }

// }

// export const fetchVacanciesAndWaitlist = async (courseCode) => {
//     try {
//         return await axios.get(url + "vacancies?courseCode=" + courseCode);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

export const fetchExams = async (courseCodes) => {
    //courseCodes: array
    try {
        const { data } = await axios.get(url + "exams?courseCodes=" + courseCodes.join(",")); 
        return data;
    } catch (error) {
        console.log(error.message);
    }
}