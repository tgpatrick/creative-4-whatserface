const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  // dest: '/var/www/whatserface.thomaspatrickprojects.net/images',
  limits: {
    fileSize: 10000000
  }
});

const mongoose = require('mongoose');

// Create a scheme for inlaws
const InlawSchema = new mongoose.Schema({
  name: String,
  relation: String,
  birthday: String,
  hobbies: String,
  notes: String,
});

// Create a model for items in the museum.
const Inlaw = mongoose.model('Inlaw', InlawSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// connect to the database
mongoose.connect('mongodb://localhost/inlaws', {
  useNewUrlParser: true
});

// Create a new inlaw
app.post('/api/inlaws/', async (req, res) => {
  const inlaw = new Inlaw({
    name: req.body.name,
    relation: req.body.relation,
    birthday: req.body.birthday,
    hobbies: req.body.hobbies,
    notes: req.body.notes
  });
  try {
    await inlaw.save();
    res.send(inlaw);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  // inlaw.save(function(err, inlaw) {
  //   if (err) {
  //     console.log(err)
  //   }
  //   res.json(inlaw);
  // });
});

// Get a list of all of the items in the museum.
app.get('/api/inlaws/', function(req, res, next) {
  Inlaw.find(function(err, inlaws) {
    if (err) {
      console.log(err)
    }
    res.json(inlaws);
  });
});

// Delete a specific item.
app.delete('/api/inlaws/:id', async (req, res) => {
  try {
    await Inlaw.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

// Edit a specific item.
app.put('/api/inlaws/:id', async (req, res) => {
  try {
    let inlaw = await Inlaw.findOne({
      _id: req.params.id
    });
    inlaw.name = req.body.name;
    inlaw.relation = req.body.relation;
    inlaw.birthday = req.body.birthday;
    inlaw.hobbies = req.body.hobbies;
    inlaw.notes = req.body.notes;
    await inlaw.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));