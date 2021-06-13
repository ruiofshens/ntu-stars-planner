import axios from 'axios';

const url="http://localhost:5000/courses/";

export const fetchCourses = async() => {
     
    try {
        return await axios.get(url);
    }
    catch (error) {
        console.log(error.message);
    }
    
 }


export const fetchTimetablePlans = async(courses) => {

    try {
        // return await axios.get(url + "generate/" + courses.join(','))
    }
    catch(error) {
        console.log(error.message);
    }

}