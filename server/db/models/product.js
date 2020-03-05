const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT,
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5000
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://img.pngio.com/potion-clip-art-minecraft-magic-minecraft-png-download-568568-potion-transparent-568_568.png',
    validate: {
      isUrl: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1000
    }
  }
});

module.exports = Product;
