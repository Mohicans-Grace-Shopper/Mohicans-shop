const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
