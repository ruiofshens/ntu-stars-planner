import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

export const getVacancies = async (courseCode) => {
  try {
    const params = {
      subj: courseCode, 
    }

    const { data } = await axios.post("https://wish.wis.ntu.edu.sg/webexe/owa/aus_vacancy.check_vacancy2", qs.stringify(params));
    const $ = cheerio.load(data);

    let indexes = [];
    $('tr').each((i, row) => {
      if (i === 0) { // skip header row
        return;
      }

      let cells = $(row).find('td');
      let indexNo = $(cells[0]).text().trim();
      if (indexNo) {
        let vacancies = $(cells[1]).text().trim();
        let waitlistLength = $(cells[2]).text().trim();
        indexes.push({
          indexNo,
          vacancies,
          waitlistLength,
        });
      }
    })
    
    return indexes;
  } catch (err) {
    console.log(err);
  }
}