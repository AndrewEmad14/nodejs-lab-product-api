const express = require('express');
const {userController} = require('../controllers');

const router = express.Router();

router.post('/', async (req, res) => {
  const {body} = req;
  const user = await userController.createUser(body);
  res.json([user]);
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const user = await userController.findById(id);
  res.json([user]);
});

router.get('/', async (req, res) => {
  const [user] = await userController.findAllUsers();
  res.json([user]);
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const status = await userController.deleteUserById({id});
  res.json([status]);
});

module.exports = router;
