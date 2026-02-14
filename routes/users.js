const express = require('express');
const {userController} = require('../controllers');

const router = express.Router();

router.post('/', async (req, res) => {
  const {body} = req;
  const user = await userController.createUser(body);
  res.json([user]);
});

router.get('/:id', async (req, res) => {
  const {id} = Number.parseInt(req.params);
  const [user] = await userController.findById(id);
  res.json([user]);
});

router.get('/', async (req, res) => {
  const [user] = await userController.findAllUsers();
  res.json([user]);
});

module.exports = router;
