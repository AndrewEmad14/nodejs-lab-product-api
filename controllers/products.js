const Products = require('../models/products');

const createProduct = async (data) => {
  const product = await Products.create(data);
  return product;
};

const findById = async (id) => {
  const product = await Products.findById(id)
    .populate('owner', 'userName -_id')
    .exec();
  return product;
};
const findAllProducts = async () => {
  const productList = await Products.find({})
    .populate('owner', 'username -_id')
    .exec();

  return productList;
};
module.exports = {
  createProduct,
  findById,
  findAllProducts
};
