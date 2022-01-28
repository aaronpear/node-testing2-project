/* eslint-disable no-undef */
const Drinks = require('./cafe-drinks-model.js');
const db = require('../../data/db-config.js');

beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('Cafe drinks model', () => {

    describe('Drinks.getAll()', () => {
        let drinks;
        beforeEach(async () => {
          drinks = await Drinks.getAll()
        })
        test('returns all drinks in table', () => {
          expect(drinks).toHaveLength(3)
        })
        test('returned drinks have id and name', () => {
          expect(drinks[0]).toMatchObject({ drink_id: 1, drink_name: 'americano' })
        })
    })

    describe('Drinks.insert(drink)', () => {
        let water = { drink_name: 'water', drink_description: 'it\'s water' };
        let result;
        beforeEach(async () => {
          result = await Drinks.addDrink(water)
        })
    
        test('db updates with the new drink', async () => {
          const newDrink = await db('drinks')
            .where('drink_id', 4)
            .first()
          expect(newDrink).toMatchObject({ drink_id: 4, drink_name: 'water', drink_description: 'it\'s water' })
        })
        test('resolves the newly created Drinks', async () => {
          expect(result).toMatchObject({ drink_id: 4, drink_name: 'water', drink_description: 'it\'s water' })
        })
    })
})
  