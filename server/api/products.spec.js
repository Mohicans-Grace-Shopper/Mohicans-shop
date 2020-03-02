/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    const love_potion = 'love_potion'

    beforeEach(() => {
      return Product.create({
        name: love_potion,
        price: 420.0
      })
    })
    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(love_potion)
    })
  }) // end describe ('/api/products')
  describe('api/products/:productId', () => {
    const lovePotion = 'love_potion'

    beforeEach(async () => {
    await Product.create({
        name: lovePotion,
        price: 420.0
      })
    })
    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(lovePotion)
    })
  }) // end describe ('/api/products/:productId)
}) // end describe('Product routes')
