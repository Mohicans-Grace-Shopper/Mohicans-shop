/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');
const Order = db.model('order');
const Product = db.model('product');
const Cart = 'cart';

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
  }); // end describe ('/api/users/:userId/cart')

  describe('PUT /api/users/:userId/cart', () => {
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
      await Product.create({
        name: 'Product One',
        price: 100
      });
      await Product.create({
        name: 'Product Two',
        price: 200
      });
      await Product.create({
        name: 'Product Three',
        price: 300
      });
      await Order.create({userId: 1});
      const order2 = await Order.create({userId: 2});
      const prods = await order2.addProduct([1, 2]);
      const prod1 = prods[0];
      const prod2 = prods[1];
      await prod1.increment('quantity', {by: 1});
      await prod2.increment('quantity', {by: 2});

      await request(app)
        .post('/auth/login')
        .send({email: moorsEmail, password: '456'})
        .expect(200);
    });

    it('ADDS product to the cart', async () => {
      const res = await request(app)
        .put('/api/users/2/cart')
        .send({
          orderId: 2,
          productId: 3,
          action: 'add',
          quantity: 3
        })
        .expect(200);
      expect(res.body.quantity).to.be.equal(3);
    });

    it('INCREMENTS product quantity', async () => {
      const res = await request(app)
        .put('/api/users/2/cart')
        .send({
          orderId: 2,
          productId: 1,
          action: 'add',
          quantity: 1
        })
        .expect(200);
      expect(res.body.quantity).to.be.equal(2);
    });

    it('DECREMENTS product quantity', async () => {
      const res = await request(app)
        .put('/api/users/2/cart')
        .send({
          orderId: 2,
          productId: 2,
          action: 'subtract',
          quantity: 1
        })
        .expect(200);
      expect(res.body.quantity).to.be.equal(1);
    });

    it('DOES NOT add product to other users carts', async () => {
      const res = await request(app)
        .put('/api/users/1/cart')
        .send({
          orderId: 2,
          productId: 2,
          action: 'add',
          quantity: 1
        });
      // .expect(403);
      expect(res.body).to.be.equal({});
    });

    it('DOES NOT increment product quantity in other users carts', async () => {
      const res = await request(app)
        .put('/api/users/1/cart')
        .send({
          orderId: 2,
          productId: 2,
          action: 'add',
          quantity: 1
        });
      // .expect(403);
      expect(res.body).to.be.equal({});
    });

    it('DOES NOT decrement product quantity in other users carts', async () => {
      const res = await request(app)
        .put('/api/users/1/cart')
        .send({
          orderId: 2,
          productId: 2,
          action: 'subtract',
          quantity: 1
        });
      // .expect(403);
      expect(res.body).to.be.equal({});
    });
    //Maybe we also want to check if guest cannot edit quantity
  }); // end describe('PUT /api/users/:userId/cart')

  describe('DELETE /api/users/:userId/cart/:orderId/:productId', () => {
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
      await Product.create({
        name: 'Product One',
        price: 100
      });
      await Product.create({
        name: 'Product Two',
        price: 200
      });
      await Product.create({
        name: 'Product Three',
        price: 300
      });
      const order1 = await Order.create({userId: 1});
      const prods1 = await order1.addProduct([3]);
      const prod11 = prods1[0];
      await prod11.increment('quantity', {by: 1});
      const order2 = await Order.create({userId: 2});
      const prods2 = await order2.addProduct([1, 2]);
      const prod21 = prods2[0];
      const prod22 = prods2[1];
      await prod21.increment('quantity', {by: 1});
      await prod22.increment('quantity', {by: 2});
      const order3 = await Order.create({userId: 2});
      const prods3 = await order3.addProduct([1]);
      const prod31 = prods3[0];
      await prod31.increment('quantity', {by: 1});
      await order3.update({isFulfilled: true});

      await request(app)
        .post('/auth/login')
        .send({email: moorsEmail, password: '456'})
        .expect(200);
    });

    it('DELETES product from the cart', async () => {
      const res = await request(app)
        .delete('/api/users/2/cart/2/1')
        .expect(200);
      expect(res.body).to.be.equal(1);
    });

    it('DOES NOT DELETE product from fulfilled orders', async () => {
      const res = await request(app)
        .delete('/api/users/1/cart/3/1')
        .expect(500);
      // expect(res.body).to.be.equal();
    });

    it('DOES NOT DELETE product from others cart', async () => {
      const res = await request(app)
        .delete('/api/users/1/cart/1/1')
        .expect(403);
      // expect(res.body).to.be.equal(1);
    });

    //Maybe we also want to check if guest cannot delete from others carts
  }); // end describe('DELETE /api/users/:userId/cart/:orderId/:productId')
}); // end describe('User routes')
