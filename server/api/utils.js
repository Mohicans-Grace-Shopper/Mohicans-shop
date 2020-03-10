// Admin Authorization
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).send('Unauthorized Permission');
  } else {
    next();
  }
};

// User Authorization
const isUser = (req, res, next) => {
  if (req.params.userId == req.user.id) {
    next();
  } else {
    res.status(403).send('Unauthorized Permission');
  }
};

module.exports = {
  isAdmin,
  isUser
};
