const router = require('express').Router()
const {User, Cart} = require('../db/models')
module.exports = router


// Admin Authorization
const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    const err = new Error('Unauthorized Permission')
    res.status(401).send(err)
    next(err)
  }
}

// User Authorization
const isUser = (req, res, next) => {
  if(!req.user.id) {
    const err = new Error('Unauthorized Permission')
    res.status(401).send(err)
    next(err)
  }
  next();
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

//Route to add item to the cart
//TBD - Need to protect the Route, should be available for users only
//TBD - Need to handle errors
//TBD - We should not be able to add more items to the cart, than total quantity for the product
router.post('/:userId/cart/:productId', async (req, res, next) => {
  try {
    const item = await Cart.findOne({
      where: {
        productId: req.params.productId,
        userId: req.params.userId
      },
    })
    if (item) {
      await item.increment('quantity', { by: 1 })
    } else {
      const user = await User.findByPk(req.params.userId)
      await user.addProduct(req.params.productId)
    }
    res.json(item)
  } catch (error) {
    next(error)
  }
})
