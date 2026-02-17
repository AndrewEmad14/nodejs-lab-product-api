const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  owner: {
    type: mongoose.ObjectId,
    ref: 'Users',
    required: [true, 'owner is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    minLength: [5, 'A name must be at least 5 char'],
    maxLength: [20, 'A name must be at most 20 char'],
    validate: [uniqueValidator, 'username must be unique']
  },
  categories: {
    type: [String],
    default: 'General'
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0
  }

}, {timestamps: true, toJSON: {virtuals: true}});

productSchema.virtual('status').get(function () {
  if (this.quantity > 2) {
    return 'avaliable';
  } else if (this.quantity === 0) {
    return 'out of stock';
  } else {
    return 'low stock';
  }
});
async function uniqueValidator(value) {
  const product = await mongoose.models.Products.findOne({name: value});
  return !product;
}
const Products = mongoose.model('Products', productSchema);

module.exports = Products;
