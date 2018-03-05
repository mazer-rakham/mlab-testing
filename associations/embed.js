const mongoose = require('mongoose');

mongoose.connect('mongodb://testing:Ayumi9822@ds225608.mlab.com:25608/web-dev-course');
// post -title, content
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Post = mongoose.model('Post', postSchema);

// user -email -name
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema],
});
const User = mongoose.model('User', userSchema, 'newuser');
const newUser = new User({
  email: 'yo_momma@dipshit.com',
  name: 'dipshit',

});
newUser.posts.push({
  title: 'how to buttfuck',
  content: 'butcuk the shit outta me',
});

newUser.save((err, user) => {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
});

