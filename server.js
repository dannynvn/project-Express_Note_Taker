//import packages and declare port
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

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
app.post('/api/notes', (req, res) => {
  
  console.info(`${req.method} request received to add a note`)

  //destructure assignment
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      uuid: uuid(),
    };
  
  
    //get existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const allNotes = JSON.parse(data);

        // Add a new note
        allNotes.push(newNote);

        // write updated notes back to file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(allNotes, null, 3),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newReview,
    };
    
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});


  //create new note object with unique identifier
  

  //push new note object into dataß
  

  //write updated data into db.json
  // fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err, data));


 










//GET Route for notes.html
app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})

//GET Route for index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//listener for port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);