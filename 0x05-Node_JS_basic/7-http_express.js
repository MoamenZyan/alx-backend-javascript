const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';


const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const ReportParts = [];
        const Lines = data.toString('utf-8').trim().split('\n');
        const StudentsFields = {};
        const DBFieldsNames = Lines[0].split(',');
        const studentPropNames = DBFieldsNames.slice(
          0,
          DBFieldsNames.length - 1,
        );

        for (const line of Lines.slice(1)) {
          const Records = line.split(',');
          const studentPropValues = Records.slice(
            0,
            Records.length - 1,
          );
          const field = Records[Records.length - 1];
          if (!Object.keys(StudentsFields).includes(field)) {
            StudentsFields[field] = [];
          }
          const studentEntries = studentPropNames.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          StudentsFields[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(StudentsFields).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        ReportParts.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(StudentsFields)) {
          ReportParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(ReportParts.join('\n'));
      }
    });
  }
});

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
  const resParts = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      resParts.push(report);
      const responseText = resParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    })
    .catch((err) => {
      resParts.push(err instanceof Error ? err.message : err.toString());
      const responseText = resParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
