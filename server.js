// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Fake in-memory database (replace with MongoDB in production)
let students = [
  { id: 1, name: "Ravi Sharma", email: "ravi@school.com" },
  { id: 2, name: "Priya Patel", email: "priya@school.com" }
];

// GET: List all students
app.get('/api/students', (req, res) => {
  res.json({ data: students });
});

// GET: Get one student by ID
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json({ data: student });
});

// POST: Create a new student
app.post('/api/students', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email required" });

  const newStudent = {
    id: students.length + 1,
    name,
    email
  };
  students.push(newStudent);
  res.status(201).json({ data: newStudent });
});

// PUT: Update a student
app.put('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });

  const { name, email } = req.body;
  if (name) student.name = name;
  if (email) student.email = email;

  res.json({ data: student });
});

// DELETE: Delete a student
app.delete('/api/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  students.splice(index, 1);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`EduTrack API running at http://localhost:${PORT}`);
});