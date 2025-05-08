const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
const upload = multer({ dest: 'uploads/' });
let recipes = [];
let comments = [];
let users = [];

app.get('/recipes', (req, res) => res.json(recipes));
app.post('/create', upload.single('image'), (req, res) => {
  const { title, category, ingredients, instructions } = req.body;
  const newRecipe = { id: recipes.length + 1, title, category, ingredients, instructions, image: req.file ? req.file.filename : 'placeholder.jpg' };
  recipes.push(newRecipe);
  res.redirect('/');
});
app.post('/comment', (req, res) => {
  const { label, comment } = req.body;
  comments.push({ label, comment });
  res.redirect('back');
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  res.send(user ? 'Login successful' : 'Invalid credentials');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));