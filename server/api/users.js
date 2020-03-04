const router = require('express').Router();
const {User, Cart, Product, Order} = require('../db/models');
module.exports = router;

// Admin Authorization
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('Unauthorized Permission');
    res.status(401).send(err);
    next(err);
  } else {
    next();
  }
};

// User Authorization
const isUser = (req, res, next) => {
  if (!req.user.id) {
    const err = new Error('Unauthorized Permission');
    res.status(401).send(err);
    next(err);
  }
  next();
};

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        isFulfilled: false
      },
      include: [
        {
          model: Product
        }
      ]
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

//Route to add item to the cart

//Route to change quantity of existing items in the cart
//TBD - Need to protect the Route, should be available for the user only
//TBD - Need to handle errors
//TBD - We should not be able to add more items to the cart, than total quantity for the product
router.put('/:userId/cart', async (req, res, next) => {
  try {
    const orderId = req.body.orderId;
    const productId = req.body.productId;
    const action = req.body.action;
    let order;
    let item = await Cart.findOne({
      where: {
        productId: productId,
        orderId: orderId
      }
    });
    if (item) {
      if (action === 'add') {
        await item.increment('quantity', {by: 1});
      } else if (action === 'subtract' && item.quantity > 1) {
        await item.decrement('quantity', {by: 1});
      }
    } else {
      order = await Order.findByPk(orderId);
      item = await order.addProduct(productId);
      item = item[0];
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
});

//Route to remove item from the cart
//TBD - Need to protect the Route, should be available for the user only
//TBD - Need to handle errors
router.delete('/:userId/cart', async (req, res, next) => {
  const orderId = req.body.orderId;
  const productId = req.body.productId;
  try {
    const item = await Order.findOne({
      where: {
        productId: productId,
        orderId: orderId
      }
    });
    if (item.quantity > 1) {
      await item.decrement('quantity', {by: 1});
    } else {
      const user = await User.findByPk(req.params.userId);
      await user.removeProduct(req.params.productId);
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
});
