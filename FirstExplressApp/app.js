const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// connect to database with mongoose and set the usages
mongoose.connect('mongodb://testing:Ayumi9822@ds225608.mlab.com:25608/web-dev-course');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
// setting up the schema
const campgroundSchema = new mongoose.Schema(
  {
    text: String,
    url: String,
    description: String,
  },
  { collection: 'tests' },
);
const Campground = mongoose.model('Campground', campgroundSchema);

// get routs
app.post('/campgrounds', (req, res) => {
  const text = req.body.name;
  const url = req.body.image;
  const desc = req.body.description;
  const newCampground = { text, url, description: desc };
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('campgrounds');
    }
  });
});
app.get('/', (req, res) => {
  res.render('landing');
});
app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});
app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds', { campgrounds: allCampgrounds });
    }
  });
});

// SHOW - expanded view of campgrounds
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id, (err, foundCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('show', { campground: foundCampgrounds });
    }
  });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));
