import { addCoursesToDB } from './scrapper/getCourses.js';
import { addExamsToDB } from './scrapper/getExams.js';

const REFRESH_AT_HOUR = 5; // accepts 0-23
const REFRESH_AT_MINUTE = 0;

async function refreshDatabase() {
  await addCoursesToDB();
  await addExamsToDB();
}

function doPeriodicRefresh() {
  let now = new Date();
  if (now.getHours() === REFRESH_AT_HOUR && now.getMinutes() === REFRESH_AT_MINUTE) {
    refreshDatabase();
  }

  now = new Date(); // allow for time passing
  let delay = 60000 - (now % 60000) // exact ms to next minute interval
  setTimeout(doPeriodicRefresh, delay);
}

export default doPeriodicRefresh;