const router = require('express').Router()
const {User} = require('../db/models')
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
