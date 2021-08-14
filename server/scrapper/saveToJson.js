import fs from 'fs';

function saveToJson(data, folder, acadSem) {
  /**
   * Saves data 2 times: once as the file the server will read, and the other as a backup copy
   */

  const jsonString = JSON.stringify(data);
  const dateNow = new Date().toLocaleString([], { hour12: false }).replace(/\//g, "-").replace(/:/g, "-").replace(', ', "T"); // basically formatting date to e.g. '14-08-2021T17-32-32'
  const fileName = `scrapper/data/${folder}/${folder}.json`;
  const backupFileName = `scrapper/data/${folder}/${acadSem}_${folder}_${dateNow}.json`;
  fs.writeFile(fileName, jsonString, (err) => {
    if (err) console.log(err);
  });
  fs.writeFile(backupFileName, jsonString, (err) => {
    if (err) console.log(err);
  });
}

export default saveToJson;