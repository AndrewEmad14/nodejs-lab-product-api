const Users = require('../models/users');

const createUser = async (data) => {
  const user = await Users.create(data);
  return user;
};

const findById = async (id) => {
  const users = await Users.findById(id)
    .select('userName')
    .exec();
  return users;
};
const findAllUsers = async () => {
  const usersList = await Users.find({})
    .select('firstName -_id')
    .exec();
  return usersList;
};
module.exports = {
  createUser,
  findById,
  findAllUsers
};
