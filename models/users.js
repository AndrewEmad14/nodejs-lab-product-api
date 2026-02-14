const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
    min: [8, 'Username at least 8 characters']
  },
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    min: 3,
    max: 15
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    min: [3, 'Username at least 3 characters'],
    max: [15, 'Username at least 15 characters']
  },
  dob: {
    type: Date
  }

}, {timestamps: true});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
