const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    //defaultValue: 1, so when product associated with user for the first time, its initial quantity in the cart should be 1
    // be a little careful about -> if the opportunity arises that you end up adding 5 rose potions without ever having added a rose potion -> you will need to make sure you don't add 6 in there, etc. etc.
    defaultValue: 1
  }
});

module.exports = Cart;
