const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    //defaultValue: 1, so when product associated with user for the first time, its initial quantity in the cart should be 1

    defaultValue: 0
  }
});

module.exports = Cart;
