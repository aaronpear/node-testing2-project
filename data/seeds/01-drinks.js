exports.seed = function(knex) {
    return knex('drinks').insert([
        { 
            "drink_name": "americano",
            "drink_description": "espresso with water",
        },
        { 
            "drink_name": "mocha",
            "drink_description":"espresso with chocolate and milk",
        },
        { 
            "drink_name": "latte",
            "drink_description": "espresso with milk",
        },
    ]);
  };


