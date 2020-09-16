require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

let cohortName = process.argv[2];
let limit = process.argv[3];
console.log(cohortName)
console.log(limit)

query = 'SELECT DISTINCT teachers.name AS teacher,' 
query += ' cohorts.name AS cohort' 
query += ' FROM teachers' 
query += ' JOIN assistance_requests' 
query += ' ON teachers.id = teacher_id' 
query += ' JOIN students' 
query += ' ON student_id = students.id' 
query += ' JOIN cohorts' 
query += ' ON cohort_id = cohorts.id' 
query += ' WHERE cohorts.name = $1 ORDER BY teachers.name;'
console.log(query);

//SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort FROM teachers JOIN assistance_requests ON teachers.id = teacher_id JOIN students ON student_id = students.id JOIN cohorts ON cohort_id = cohorts.id WHERE cohorts.name = $1 ORDER BY teachers.name;

pool.query(query, [cohortName])
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
  pool.end();
})
.catch(err => console.error('query error', err.stack));