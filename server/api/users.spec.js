/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');
const Order = db.model('order');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return User.create({
        email: codysEmail
      });
    });

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].email).to.be.equal(codysEmail);
    });
  }); // end describe('/api/users')

  describe('/api/users/:userId', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(async () => {
      await User.create({
        email: codysEmail
      });
    });
    it('GET /api/users/:userId', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.email).to.be.equal(codysEmail);
    });
  }); // end describe ('/api/users/:userId')
  describe('/api/users/:userId/cart', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(async () => {
      await User.create({
        email: codysEmail
      });
      await Order.create({userId: 1});
    });
    it('GET /api/users/:userId/cart', async () => {
      const res = await request(app)
        .get('/api/users/1/cart')
        .expect(200);
      expect(res.body.id).to.be.equal(1);
      expect(res.body.isFulfilled).to.be.equal(false);
      expect(Array.isArray(res.body.products)).to.be.equal(true);
    });
  });
}); // end describe('User routes')
