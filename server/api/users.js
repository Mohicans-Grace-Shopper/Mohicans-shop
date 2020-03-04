const router = require('express').Router();
const {User, Cart, Product} = require('../db/models');
module.exports = router;

// moving the isAdmin/other pieces of middleware into a utils file, or a gatekeeping file so that you can export it and use it anywhere.

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

// RESTfulness -> this is still fine to use
// /users/:userId/orders/:orderId
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const array = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: Product
        }
      ]
    });
    res.json(array);
  } catch (err) {
    next(err);
  }
});

// would hide immediately before people hack.
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

//Route to add item to the cart
//TBD - Need to protect the Route, should be available for the user only
//TBD - Need to handle errors
//TBD - We should not be able to add more items to the cart, than total quantity for the product
// would also recommend passing in the product as a body and not in the route
// looks like i am trying to access the user's cart number productId
router.post('/:userId/cart/:productId', async (req, res, next) => {
  try {
    const item = await Cart.findOne({
      where: {
        productId: req.params.productId,
        userId: req.params.userId
      }
    });
    if (item) {
      await item.increment('quantity', {by: 1});
    } else {
      const user = await User.findByPk(req.params.userId);
      await user.addProduct(req.params.productId);
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
});

//Route to remove item from the cart
//TBD - Need to protect the Route, should be available for the user only
//TBD - Need to handle errors
router.delete('/:userId/cart/:productId', async (req, res, next) => {
  try {
    const item = await Cart.findOne({
      where: {
        productId: req.params.productId,
        userId: req.params.userId
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
