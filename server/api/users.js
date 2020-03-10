const {isAdmin, isUser} = require('./utils');
const router = require('express').Router();
const {User, Cart, Product, Order} = require('../db/models');
module.exports = router;

router.get('/', isAdmin, async (req, res, next) => {
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

router.get('/:userId/cart', isUser, async (req, res, next) => {
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
      ],
      order: [[Product, 'id', 'ASC']]
    });
    if (order === null) {
      const newOrder = await Order.create({userId: req.params.userId});
      res.json(newOrder);
    } else {
      res.json(order);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', isAdmin, isUser, async (req, res, next) => {
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
router.put('/:userId/cart', isUser, async (req, res, next) => {
  try {
    const orderId = req.body.orderId;
    const productId = req.body.productId;
    const action = req.body.action;
    const quant = req.body.quantity;
    let order;
    let item = await Cart.findOne({
      where: {
        productId: productId,
        orderId: orderId
      }
    });
    if (!item) {
      order = await Order.findByPk(orderId);
      item = await order.addProduct(productId);
      item = item[0];
    }
    if (action === 'add') {
      await item.increment('quantity', {by: quant});
    } else if (action === 'subtract' && item.quantity > 1) {
      await item.decrement('quantity', {by: 1});
    }
    const addedProduct = await Product.findByPk(item.productId);
    addedProduct.quantity = item.quantity;
    res.send(addedProduct);
  } catch (error) {
    next(error);
  }
});

//Route to remove product from the cart
//TBD - Need to protect the Route, should be available for the user only
//TBD - Need to handle errors
router.delete(
  '/:userId/cart/:orderId/:productId',
  isUser,
  async (req, res, next) => {
    const orderId = req.params.orderId;
    const productId = req.params.productId;

    try {
      const order = await Order.findByPk(orderId);
      console.log(orderId);
      const removed = await order.removeProduct(productId);
      res.json(removed);
    } catch (error) {
      next(error);
    }
  }
);

//Route to checkout and complete order
router.put('/cart/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId;
  console.log('hi im hitting');
  try {
    const [rowsUpdate, [updatedOrder]] = await Order.update(
      {isFulfilled: true},
      {returning: true, where: {id: orderId}}
    );
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

//Route to access shell account and order as a guest
router.post('/guest/cart', async (req, res, next) => {
  const products = req.body.orderItems;
  try {
    const order = await Order.create({userId: null});
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      await order.addProduct([product.id], {
        through: {quantity: product.quantity}
      });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});
