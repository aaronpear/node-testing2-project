const express = require('express');
const server = express();
const DrinkRouter = require('./cafe-drinks/cafe-drinks-router.js');

server.use(express.json());
server.use('/api/drinks', DrinkRouter);

server.use('*', (req, res) => {
    res.json({ status: 404, message: 'Request not found' });
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({ message: err.message })
})  

module.exports = server;
