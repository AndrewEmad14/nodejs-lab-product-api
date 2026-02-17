const mongoose = require('mongoose');
const encyption = require('../helpers/encryption');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
    minLength: [8, 'Username at least 8 characters'],
    validate: [uniqueValidator, 'username must be unique']
  },
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    minLength: 3,
    maxLenth: 15
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minLength: [3, 'Username at least 3 characters'],
    maxLenth: [15, 'Username at least 15 characters']
  },
  password: {
    type: String,
    minLength: [8, 'password has to be atleast 8 characters']

  },
  dob: {
    type: Date
  }

}, {toJSON: {transform(doc, ret, options) {
  delete ret.password;
  delete ret.__v;
  return ret;
}}}, {timestamps: true});

async function uniqueValidator(value) {
  const user = await mongoose.models.Users.findOne({userName: value});
  return !user;
}
userSchema.pre('save', function () {
  this.password = encyption.hashPassword(this.password);
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
