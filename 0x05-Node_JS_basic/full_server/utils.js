import fs from 'fs';

const readDatabase = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const Lines = data
          .toString('utf-8')
          .trim()
          .split('\n');
        const Groups = {};
        const DBFieldsNames = Lines[0].split(',');
        const studentPropNames = DBFieldsNames
          .slice(0, DBFieldsNames.length - 1);

        for (const line of Lines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord
            .slice(0, studentRecord.length - 1);
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(Groups).includes(field)) {
            Groups[field] = [];
          }
          const studentEntries = studentPropNames
            .map((propName, idx) => [propName, studentPropValues[idx]]);
          Groups[field].push(Object.fromEntries(studentEntries));
        }
        resolve(Groups);
      }
    });
  }
});

export default readDatabase;
module.exports = readDatabase;
