import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import qs from 'qs';

const getExamDetails = async (sem, acadYear, planNo, examYear) => {
  /**
   * Writes to data/exams in JSON, an array of Exam objects. E.g. of an Exam object:
   * {
   *  date: "19 November 2021",
   *  day: "Friday",
   *  time: "9.00 am",
   *  courseCode: "HL1002",
   *  courseTitle: "SURVEY OF ENGLISH LITERATURE 1",
   *  duration: "2 hr 30 min"
   * }
   * 
   * @param sem "1" or "2"
   * @param acadYear e.g. "2021-2022"
   * @param planNo e.g. "105" - to obtain from website manually for now
   * @param examYear e.g. "2021"
   */
  try {
    const params = {
      p_exam_dt: "",
      p_start_time: "",
      p_dept: "",
      p_subj: "",
      p_venue: "",
      p_matric: "",
      academic_session: `Semester+${sem}+Academic+Year+${acadYear}`,
      p_plan_no: planNo,
      p_exam_yr: examYear,
      p_semester: sem,
      p_type: "UE",
      bOption: "Next",
    }

    const { data } = await axios.post("https://wis.ntu.edu.sg/webexe/owa/exam_timetable_und.Get_detail", qs.stringify(params));
    const $ = cheerio.load(data);

    let exams = []
    $('table[width="100%"] > tbody > tr[align="yes"]').each((i, tr) => { 
      let cells = []
      $(tr).find('td').each((j, td) => {
        cells.push($(td).text().trim())
      }) 
      let exam = {
        date: cells[0],
        day: cells[1],
        time: cells[2],
        courseCode: cells[3],
        courseTitle: cells[4],
        duration: cells[5],
      }
      
      if (cells.length != 0) {
        exams.push(exam);
      }
    });

    const examsJSON = JSON.stringify(exams);
    
    const fileName = `data/exams/${acadYear.split("-")[0]};${sem}_exams.json`; // e.g. of file name: 2021;1 (same as courses)
    fs.writeFile(fileName, examsJSON, (err) => {
      if (err) console.log(err);
    });
    console.log("Done")

  } catch (err) {
    console.log(err);
  }
}

getExamDetails("1", "2021-2022", "105", "2021");