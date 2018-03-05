const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Clouds rest',
    image: 'http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51',
    description: 'blah blah blah',
  },
  {
    name: 'Some bullshite',
    image: 'http://www.buyseaislenj.com/sea_isle_city_cape_may_county_campgrounds_island_realty_group_12072011.jpg',
    description: 'this campground is awesome',
  },
  {
    name: 'Welcome to hawaii bitch',
    image: 'https://www.nps.gov/havo/planyourvisit/images/Namakanipaio_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
    description: 'this is the coolest thing ever',
  },
];
function seedDB() {
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('removed campgrounds');
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log('added a campground');
          Comment.create({
            text: 'this place is great wish it had internet',
            author: 'homer',
          }, (err, comment) => {
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log('created new comments');
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;
