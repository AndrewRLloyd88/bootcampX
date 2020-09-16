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

pool.query('SELECT students.id as student_id, students.name as name, cohorts.name as cohort FROM students JOIN cohorts ON cohorts.id = cohort_id WHERE cohorts.name = $2 LIMIT $1;', [limit, cohortName])
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
  pool.end();
})
.catch(err => console.error('query error', err.stack));