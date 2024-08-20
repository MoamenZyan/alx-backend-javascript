
const fs = require('fs');


const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }
  const Lines = fs
    .readFileSync(dataPath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const Groups = {};
  const dbFieldNames = Lines[0].split(',');
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

  for (const line of Lines.slice(1)) {
    const studentRecord = line.split(',');
    const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
    const field = studentRecord[studentRecord.length - 1];
    if (!Object.keys(Groups).includes(field)) {
      Groups[field] = [];
    }
    const Entries = studentPropNames
      .map((propName, idx) => [propName, studentPropValues[idx]]);
    Groups[field].push(Object.fromEntries(Entries));
  }

  const Students = Object
    .values(Groups)
    .reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${Students}`);
  for (const [field, group] of Object.entries(Groups)) {
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
