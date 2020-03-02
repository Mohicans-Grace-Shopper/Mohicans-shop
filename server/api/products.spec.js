/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => { 
    beforeEach(() => { 
        return db.sync({ force: true })
    })

    describe('/api/products', () => { 
        const love_potion = 'love_potion'

        beforeEach(() => { 
            return Product.create({
                name: 
            })
        })
    })
})