const router = require('express').Router();
module.exports = router;

// you may need to use it in here v
router.use('/users', require('./users'));
router.use('/products', require('./products'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
