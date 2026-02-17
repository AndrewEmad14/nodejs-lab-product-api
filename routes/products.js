const express = require('express');
const {productController} = require('../controllers');
const {quantityValidator, userValidator, authMiddleware} = require('../helpers/validators');

const router = express.Router();
router.get('/', async (req, res) => {
  const {limit} = req.query;
  const {skip} = req.query;
  const {status} = req.query;

  const product = await productController.findAllProducts(limit, skip, status);
  res.json([product]);
});
router.post('/', async (req, res) => {
  const {body} = req;
  const product = await productController.createProduct(body);
  res.json([product]);
});
router.patch('/:id', authMiddleware, userValidator, async (req, res) => {
  const {body} = req;
  const {id} = req.params;
  const {acknowledged} = await productController.updateProduct(id, body);
  if (acknowledged) {
    res.status(202).send('product was edited successfully');
  } else {
    res.status(400).send('Bad request');
  }
});
router.patch('/:id/restock', userValidator, async (req, res) => {
  const {body} = req;
  const {id} = req.params;
  const {acknowledged} = await productController.restockProduct(id, body);
  if (acknowledged) {
    res.status(202).send('product was restock successfully');
  } else {
    res.status(400).send('Bad request');
  }
});
router.patch('/:id/destock', userValidator, quantityValidator, async (req, res) => {
  const {body} = req;
  const {id} = req.params;
  const {acknowledged} = await productController.destockProduct(id, body);
  if (acknowledged) {
    res.status(202).send('product was destock successfully');
  } else {
    res.status(400).send('Bad request');
  }
});
router.delete('/:id', userValidator, async (req, res) => {
  const {id} = req.params;
  const status = await productController.deleteProductById(id);
  res.json([status]);
});

module.exports = router;
