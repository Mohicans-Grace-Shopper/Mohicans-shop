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

module.exports = {
  isAdmin,
  isUser
};
