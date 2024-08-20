const fs = require('fs');


const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
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
        const StudentsRecords = line.split(',');
        const studentPropValues = StudentsRecords
          .slice(0, StudentsRecords.length - 1);
        const field = StudentsRecords[StudentsRecords.length - 1];
        if (!Object.keys(Groups).includes(field)) {
          Groups[field] = [];
        }
        const Entries = studentPropNames
          .map((propName, idx) => [propName, studentPropValues[idx]]);
        Groups[field].push(Object.fromEntries(Entries));
      }

      const Total = Object
        .values(Groups)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      console.log(`Number of students: ${Total}`);
      for (const [field, group] of Object.entries(Groups)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
