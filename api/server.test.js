/* eslint-disable no-undef */
const request = require('supertest');
const server = require('./server.js');
const db = require('../data/db-config.js');

beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
})

afterAll(async () => {
    await db.destroy();
})
  
describe('GET /api/drinks', () => {
    test('returns a status 200 OK', async () => {
      const res = await request(server).get('/api/drinks');
      expect(res.status).toBe(200);
    })
  })

describe('POST /api/drinks', () => {
    test('returns a status 201 Created', async () => {
      const res = await request(server)
        .post('/api/drinks')
        .send({ drink_name: 'water', drink_description: 'it\'s water' });
      expect(res.status).toBe(201);
    })
    test('returns the new drink', async () => {
      const res = await request(server)
        .post('/api/drinks')
        .send({ drink_name: 'gravy', drink_description: 'it\'s gravy' });
      expect(res.body.drink_name).toBe('gravy');
      expect(res.body.drink_id).toBe(4);
    })
})

describe('Cafe drinks middleware', () => {
    test('returns status 400 on invalid drink_name', async () => {
        const res = await request(server)
            .post('/api/drinks')
            .send({ drink_description: 'it\'s water' });
        expect(res.status).toBe(400);       
    })
    test('returns status 400 on invalid drink_description', async () => {
        const res = await request(server)
            .post('/api/drinks')
            .send({ drink_name: 'water' });
        expect(res.status).toBe(400);       
    })
    test('returns proper message on invalid drink', async () => {
        const res = await request(server)
            .post('/api/drinks')
            .send({ drink_name: 'water' });
        expect(res.body.message).toBe('Drink name and description are required');       
    })
})
  