const router = require('express').Router();
const {Product} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/increase', async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    product.quantity++;
    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/decrease', async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    product.quantity--;
    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
