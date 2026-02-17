const Users = require('../models/users');

const createUser = async (data) => {
  const user = await Users.create(data);
  return user;
};

const findById = async (id) => {
  const user = await Users.findById(id)
    .select('firstName -_id')
    .exec();
  return user;
};
const findAllUsers = async () => {
  const usersList = await Users.find({})
    .select('firstName -_id')
    .exec();
  return usersList;
};

const deleteUserById = async (id) => {
  const status = await Users.deleteOne({_id: id}).exec();
  return status;
};

const updateUser = async (id, data) => {
  const updatedUser = Users.updateOne({_id: id}, data, {runValidators: true});
  return updatedUser;
};
module.exports = {
  createUser,
  findById,
  findAllUsers,
  deleteUserById,
  updateUser
};
