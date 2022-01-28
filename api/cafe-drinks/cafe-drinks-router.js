const express = require('express')
const { validateDrink } = require('./cafe-drinks-middleware.js');
const Drinks = require('./cafe-drinks-model.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    Drinks.getAll()
        .then(drinks => {
            res.status(200).json(drinks);
        })
        .catch(err => {
            next(err);
        });
})

router.post('/', validateDrink, (req, res, next) => {
    Drinks.addDrink(req.body)
        .then(drink => {
            res.status(201).json(drink);
        })
        .catch(err => {
            next(err);
        });
})

module.exports = router;