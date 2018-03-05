const mongoose = require('mongoose');

mongoose.connect('mongodb://testing:Ayumi9822@ds225608.mlab.com:25608/web-dev-course');
// post -title, content
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Post = mongoose.model('Post', postSchema, 'posts2');

// user -email -name
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
});
const User = mongoose.model('User', userSchema, 'newuser2');

// User.create({
//   email: 'bob@gmail.com',
//   name: 'Bob Belchers',
// });
// Post.create({
//   title: 'how to cook part2',
//   content: 'blabh akjf sdf kjshgf',
// }, (err, post) => {
//   User.findOne({ email: 'bob@gmail.com' }, (err, foundUser) => {
//     if (err) {
//       console.log(err);
//     } else {
//       foundUser.posts.push(post);
//       foundUser.save((err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data);
//         }
//       });
//     }
//   });
// });

User.findOne({ email: 'bob@gmail.com' }).populate('posts').exec((err, user) => {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
});
