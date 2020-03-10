// Admin Authorization
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    // const err = new Error('Unauthorized Permission');
    res.status(403).send('Unauthorized Permission');
    // next(err);
  } else {
    next();
  }
};

// User Authorization
const isUser = (req, res, next) => {
  if (req.params.userId == req.user.id) {
    next();
  } else {
    // const err = new Error('Unauthorized Permission');
    res.status(403).send('Unauthorized Permission');
    // next(err);
  }
};

module.exports = {
  isAdmin,
  isUser
};
