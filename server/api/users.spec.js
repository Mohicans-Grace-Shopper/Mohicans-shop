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
    const moorsEmail = 'moor@email.com';

    beforeEach(async () => {
      await User.create({
        email: codysEmail,
        password: '123',
        isAdmin: true
      });
      await User.create({
        email: moorsEmail,
        password: '456',
        isAdmin: false
      });
    });

    it('GETS all users for admin', async () => {
      const resPost = await request(app)
        .post('/auth/login')
        .send({email: codysEmail, password: '123'})
        .expect(200);
      expect(resPost.body.isAdmin).to.be.equal(true);

      const res = await request(app)
        .get('/api/users')
        .expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
      expect(res.body[0].email).to.be.equal(codysEmail);
    });

    it('DOES NOT GET users for user', async () => {
      const resPost = await request(app)
        .post('/auth/login')
        .send({email: moorsEmail, password: '456'})
        .expect(200);
      expect(resPost.body.isAdmin).to.be.equal(false);

      const res = await request(app).get('/api/users');
      // .expect(403);
      expect(res.body).to.be.an('array');
      expect(res.body).to.be.equal([]);
    });

    it('DOES NOT GET users for guest', async () => {
      const res = await request(app).get('/api/users');
      // .expect(403);
      expect(res.body).to.be.equal([]);
    });
  }); // end describe('/api/users')

  //??????? What this route supposed to do????
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
    const moorsEmail = 'moor@email.com';

    beforeEach(async () => {
      await User.create({
        email: codysEmail,
        password: '123',
        isAdmin: true
      });
      await User.create({
        email: moorsEmail,
        password: '456',
        isAdmin: false
      });
      await Order.create({userId: 1});
    });
    it('GETS cart for specified user', async () => {
      await request(app)
        .post('/auth/login')
        .send({email: codysEmail, password: '123'})
        .expect(200);

      const res = await request(app)
        .get('/api/users/1/cart')
        .expect(200);
      expect(res.body.id).to.be.equal(1);
      expect(res.body.isFulfilled).to.be.equal(false);
      expect(Array.isArray(res.body.products)).to.be.equal(true);
    });

    it('DOES NOT GET cart for other user', async () => {
      await request(app)
        .post('/auth/login')
        .send({email: moorsEmail, password: '456'})
        .expect(200);

      const res = await request(app).get('/api/users/1/cart');
      // .expect(403);
      expect(res.body).to.be.equal({});
    });

    it('DOES NOT GET cart for a user if guest', async () => {
      const res = await request(app).get('/api/users/1/cart');
      // .expect(403);
      expect(res.body).to.be.equal({});
    });
  });
}); // end describe('User routes')
