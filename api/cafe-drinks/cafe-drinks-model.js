const db = require('../../data/db-config.js');

function getAll() {
    return db('drinks');
}

function addDrink(drink) {
    return db('drinks')
        .insert(drink)
        .then(([drink_id]) => {
            return db('drinks')
                .where('drink_id', drink_id)
                .first();
        })
}

module.exports = { getAll, addDrink }