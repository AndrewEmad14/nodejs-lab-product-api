const jwt = require('jsonwebtoken');
const {productController} = require('../controllers');

const quantityValidator = async function (req, res, next) {
  const {body} = req;
  const {id} = req.params;
  const product = await productController.findById(id);
  if ((product.quantity - body.quantity) < 0) {
    const error = {message: 'quantity cant be negative'};
    next(error);
  } else {
    next();
  }
};

const userValidator = async function (req, res, next) {
  const allHeaders = req.user;
  console.log(req.user);
  const {id} = req.params;
  const product = await productController.findById(id);
  console.log(`productOwner = ${product.owner.toString()} userId = ${allHeaders.id}`);
  if (product.owner.toString() !== allHeaders.id) {
    const error = {message: 'YOU are not allowed to change an item you dont own'};
    next(error);
  } else {
    next();
  }
};

const authMiddleware = async function (req, res, next) {
  const {usertoken} = req.headers;

  if (!usertoken) {
    const error = {message: 'you are not logged in'};
    next(error);
  } else {
    jwt.verify(usertoken, 'aksldjfalksdjf;lakdsjf', (err, decodedToken) => {
      if (err) {
        next(err);
      } else {
        req.user = decodedToken;
        next();
      }
    });
  }
};

module.exports = {
  quantityValidator,
  userValidator,
  authMiddleware
};
