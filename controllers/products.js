const Products = require('../models/products');

const createProduct = async (data) => {
  const product = await Products.create(data);
  return product;
};

const findProductsbyUserId = async (userId) => {
  const product = await Products.find({owner: userId})
    .populate('owner', 'userName -_id')
    .exec();
  return product;
};
const findAllProducts = async (limit, skip, status) => {
  let query;
  if (status === 'available') {
    query = {quantity: {$gt: 2}};
  } else if (status === 'out of stock') {
    query = {quantity: {$eq: 0}};
  } else {
    query = {$and: [{quantity: {$lt: 2}}, {quantity: {$gt: 0}}]};
  }
  const productList = await Products.find(query)
    .limit(limit)
    .skip(skip)
    .exec();

  return productList;
};
const updateProduct = async (id, data) => {
  const product = Products.updateOne({_id: id}, data, {runValidators: true});
  return product;
};
const restockProduct = async (id, data) => {
  const product = Products.updateOne({_id: id}, {$inc: {quantity: data.quantity}}, {runValidators: true});
  return product;
}; const destockProduct = async (id, data) => {
  const product = Products.updateOne({_id: id}, {$inc: {quantity: -data.quantity}}, {runValidators: true});
  return product;
};
const deleteProductById = async (id) => {
  const status = await Products.deleteOne({_id: id}).exec();
  return status;
};
module.exports = {
  createProduct,
  findProductsbyUserId,
  findAllProducts,
  updateProduct,
  deleteProductById,
  restockProduct,
  destockProduct
};
