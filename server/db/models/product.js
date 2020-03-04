const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // SARAH: anytime you are not adding any more validations - i would suggest just making the property the type description: Sequelize.TEXT
  description: {
    type: Sequelize.TEXT
  },
  price: {
    // it may have cents -> work in pennies
    // type - integer
    // wanted to retrieve values in dollars -> add a getter method that will retrieve in dollars, or just show it in the frontend like /100
    type: Sequelize.FLOAT,
    allowNull: false
    // include a default of 0 galleons?
    // maximum, minimum
  },
  imageUrl: {
    type: Sequelize.STRING
    // add in a default image -> you do need to display this in the FE
    // add in isUrl validation
  },
  quantity: {
    // inventory
    type: Sequelize.INTEGER,
    defaultValue: 0
    // max/min would be ideal
  }
});

module.exports = Product;
