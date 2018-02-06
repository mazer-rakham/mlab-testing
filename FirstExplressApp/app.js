const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const MONGO_URL = 'mongodb://testing:Ayumi9822@ds225608.mlab.com:25608/web-dev-course';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
MongoClient.connect(MONGO_URL, (err, client) => {
  const db = client.db('web-dev-course');
  if (err) {
    return console.log(err);
  }
});


const campgrounds = [
  {
    name: 'Monkey Shine',
    url: 'https://farm5.staticflickr.com/4285/35301859822_4d49713574.jpg',
  },
  {
    name: 'Sunset Hill',
    url: 'https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg',
  },
  {
    name: 'Awesome Retreat',
    url: 'https://farm4.staticflickr.com/3011/2997488895_4c458dca1d.jpg',
  },
];
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('landing');
});
app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds });
});
app.post('/campgrounds', (req, res) => {
  const name = req.body.name;
  const url = req.body.image;
  const newCampground = { name, url };
  campgrounds.push(newCampground);
  res.redirect('/campgrounds');
});
app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));
