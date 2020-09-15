SELECT teachers.name as teacher, students.name as student, assignments.name as assignment, SUM(completed_at - started_at) as duration
FROM assistance_requests
JOIN teachers
ON teacher_id = teachers.id
JOIN students
ON student_id = students.id
JOIN assignments
ON assignment_id = assignments.id
GROUP BY teacher, student, assignment, duration
ORDER BY duration;

--Select the teacher's name, student's name, assignment's name, and the duration of each assistance request.
--Subtract completed_at by started_at to find the duration.
--Order by the duration of the request.
