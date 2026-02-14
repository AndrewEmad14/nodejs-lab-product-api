const express = require('express');
const {productController} = require('../controllers');

const router = express.Router();

router.post('/', async (req, res) => {
  const {body} = req;
  const product = await productController.createProduct(body);
  res.json([product]);
});

router.get('/:id', async (req, res) => {
  const {id} = Number.parseInt(req.params);
  const [product] = await productController.findById(id);
  res.json([product]);
});

router.get('/', async (req, res) => {
  const [product] = await productController.findAllProducts();
  res.json([product]);
});

module.exports = router;
