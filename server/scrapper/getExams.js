import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import qs from 'qs';

import ExamModel from '../models/examDetails.js';

const getExamDetails = async (sem, acadYear, planNo, examYear) => {
  /**
   * Writes to data/exams in JSON, an array of Exam objects. E.g. of an Exam object:
   * {
   *  examDate: Date object (can get day of week and start time from this),
   *  endTime: Date object,
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

   console.log("Retrieving exams from NTU...");

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

    const exams = []
    $('table[width="100%"] > tbody > tr[align="yes"]').each((i, tr) => { 
      let cells = [] // [date, day, time, courseCode, courseTitle, duration]
      $(tr).find('td').each((j, td) => {
        cells.push($(td).text().trim())
      });

      if (cells.length !== 0) {
        let date = cells[0]; // e.g. "18 November 2021"
        let day = cells[1]; // e.g. "Thursday"
        let time = cells[2].replace(".", ":"); // e.g. "1.00 pm" => "1:00 pm"
        let courseCode = cells[3];
        let courseTitle = cells[4];
        let duration = cells[5]; // e.g. "2 hr 30 min"
        
        let examDate = new Date(`${date} ${time}`);
        let durationSplit = duration.split(" ");
        let endTime = null;
        if (durationSplit.length === 2) { // only hour
          endTime = new Date(examDate.getTime() + (parseInt(durationSplit[0])*60*60*1000));
        } else if (durationSplit.length === 4) { // hour and minute
          let durationInMs = (parseInt(durationSplit[0])*60*60*1000) + (parseInt(durationSplit[2])*60*1000);
          endTime = new Date(examDate.getTime() + durationInMs);
        } else {
          throw `Error: Unable to calculate endTime for course ${courseCode}`;
        }

        let exam = {
          examDate,
          endTime,
          courseCode,
          courseTitle,
          duration,
        }

        exams.push(exam);
      }
    });

    // const examsJSON = JSON.stringify(exams);
    
    // const fileName = `data/exams/${acadYear.split("-")[0]};${sem}_exams.json`; // e.g. of file name: 2021;1 (same as courses)
    // fs.writeFile(fileName, examsJSON, (err) => {
    //   if (err) console.log(err);
    // });

    console.log("Exams retrieved.")
    return exams;
  } catch (err) {
    console.log(err);
  }
}

export const addExamsToDB = async () => {
  const exams = await getExamDetails("1", "2021-2022", "105", "2021");
  
  for (let i = 0; i < exams.length; i++) {
    let exam = new ExamModel(exams[i]);
    await exam.save((err) => {
      if (err) console.log(err);
      else console.log(`Added Exam for ${exams[i].courseCode} to database.`)
    })
  }  
}
