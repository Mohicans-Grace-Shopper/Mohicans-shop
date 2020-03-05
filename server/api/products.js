const router = require('express').Router();
const {Product} = require('../db/models');
const {isAdmin, isUser} = require('./utils');

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

// restrict access to creating products to Admin Only

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const {name, quantity, description, price, imageUrl} = req.body;
    const newProduct = {};
    if (name) newProduct.name = name;
    if (quantity) newProduct.quantity = quantity;
    if (description) newProduct.description = description;
    if (price) newProduct.price = price;
    if (imageUrl) newProduct.imageUrl = imageUrl;

    const createdProduct = await Product.create(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
});

// restrict access to updating products to Admin Only
router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const foundProduct = await Product.findByPk(req.params.productId);
    const {name, quantity, description, price, imageUrl} = req.body;
    const updateProduct = {};
    if (name) updateProduct.name = name;
    if (quantity) updateProduct.quantity = quantity;
    if (description) updateProduct.description = description;
    if (price) updateProduct.price = price;
    if (imageUrl) updateProduct.imageUrl = imageUrl;

    const updatedProduct = await foundProduct.update(updateProduct);
    res.status(201).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// restrict access to deleting products to Admin Only
router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    const foundProduct = await Product.findByPk(req.params.productId);
    if (!foundProduct) {
      res.sendStatus(404);
    } else {
      await foundProduct.destroy();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
