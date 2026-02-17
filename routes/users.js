const express = require('express');
const jwt = require('jsonwebtoken');
const {userController} = require('../controllers');
const {productController} = require('../controllers');
const encyption = require('../helpers/encryption');
const Users = require('../models/users');

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
  const status = await userController.deleteUserById(id);
  res.json([status]);
});

router.patch('/:id', async (req, res) => {
  const {body} = req;
  const {id} = req.params;
  const {acknowledged} = await userController.updateUser(id, body);
  if (acknowledged) {
    res.status(202).json({message: 'user was edited successfully'});
  } else {
    res.status(400).json({message: 'Bad request'});
  }
});
router.post('/login', async (req, res) => {
  const {userName, password} = req.body;
  const user = await userController.findUser(userName);
  console.log(user);
  if (user && (await encyption.verifyPassword(password, user.password))) {
    const token = jwt.sign({id: user._id}, 'aksldjfalksdjf;lakdsjf', {expiresIn: '1h'});
    res.json({token});
  } else {
    res.status(401).json({message: 'Invalid credentials'});
  }
});

router.get('/:userId/products', async (req, res) => {
  const {userId} = req.params;
  const product = await productController.findProductsbyUserId(userId);
  res.json(product);
});
module.exports = router;
