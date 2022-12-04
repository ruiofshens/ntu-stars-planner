import axios from 'axios';

const url = 'https://stars-panel-be.fly.dev/courses/';

export const fetchAllCourses = async () => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchCourses = async (courseCodes) => {
  //courseCodes: array
  try {
    const { data } = await axios.get(
      url + 'courses?courseCodes=' + courseCodes.join(',')
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchVacanciesAndWaitlist = async (courseCode) => {
  try {
    const { data } = await axios.get(
      url + 'vacancies?courseCode=' + courseCode
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchExams = async (courseCodes) => {
  //courseCodes: array
  try {
    const { data } = await axios.get(
      url + 'exams?courseCodes=' + courseCodes.join(',')
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchAcadSem = async () => {
  try {
    const { data } = await axios.get(url + 'acadSem');
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
