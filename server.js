//import packages and declare port
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
let data = require('./db/db.json');
// const api = require('./assets/js/index.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static middleware
app.use(express.static('public'));



//get notes
app.get('/api/notes',(req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// post and display notes
app.post('/api/notes', function (req, res) {
  const newNote = {
    uuid: uuid(),
    title: req.body.title,
    text: req.body.text
  };
  data.push(newNote);
  res.json(data);
  console.log(newNote);
  console.log(data);
})







//GET Route for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET Route for notes.html
app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})

//listener for port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);