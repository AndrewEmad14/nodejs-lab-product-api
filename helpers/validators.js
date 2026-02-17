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

module.exports = {
  quantityValidator
};


//
