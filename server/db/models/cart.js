const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  itemPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Cart;
