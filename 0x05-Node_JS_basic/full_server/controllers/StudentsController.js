import readDatabase from '../utils';


const MAJORS = ['CS', 'SWE'];


class StudentsController {
  static getAllStudents(request, response) {
    const Path = process.argv.length > 2 ? process.argv[2] : '';

    readDatabase(Path)
      .then((studentGroups) => {
        const resParts = ['This is the list of our students'];

        const cmpFxn = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) {
            return -1;
          }
          if (a[0].toLowerCase() > b[0].toLowerCase()) {
            return 1;
          }
          return 0;
        };

        for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)) {
          resParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        response.status(200).send(resParts.join('\n'));
      })
      .catch((err) => {
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }

  static getAllStudentsByMajor(request, response) {
    const Path = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = request.params;

    if (!MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(Path)
      .then((studentGroups) => {
        let responseText = '';

        if (Object.keys(studentGroups).includes(major)) {
          const group = studentGroups[major];
          responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
        }
        response.status(200).send(responseText);
      })
      .catch((err) => {
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
