const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
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
        const reportParts = [];
        const Lines = data.toString('utf-8').trim().split('\n');
        const StudentsGroups = {};
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
          if (!Object.keys(StudentsGroups).includes(field)) {
            StudentsGroups[field] = [];
          }
          const studentEntries = studentPropNames.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          StudentsGroups[field].push(Object.fromEntries(studentEntries));
        }

        const Total = Object.values(StudentsGroups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportParts.push(`Number of students: ${Total}`);
        for (const [field, group] of Object.entries(StudentsGroups)) {
          reportParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportParts.join('\n'));
      }
    });
  }
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
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
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening http://${HOST}:${PORT}\n`);
});

module.exports = app;
