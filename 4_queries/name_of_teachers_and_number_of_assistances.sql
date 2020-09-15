SELECT DISTINCT teachers.name AS teacher, cohorts.name as cohort, COUNT(teachers.name) as total_assistances
FROM teachers
JOIN assistance_requests
ON teachers.id = teacher_id
JOIN students
ON student_id = students.id
JOIN cohorts
ON cohort_id = cohorts.id
WHERE cohorts.name = 'JUL02'
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;




--Name of Teachers and Number of Assistances
--We need to know which teachers actually assisted students during any cohort, and how many assistances they did for that cohort.
--
--Perform the same query as before, but include the number of assistances as well.
--
--Expected Result:
--
--      teacher       | cohort | total_assistances 
----------------------+--------+-------------------
-- Cheyanne Powlowski | JUL02  |               336
-- Georgiana Fahey    | JUL02  |               158
-- Helmer Rodriguez   | JUL02  |               157
-- Jadyn Bosco        | JUL02  |               177
--...
--(8 rows)