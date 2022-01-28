exports.up = async function(knex) {
    await knex.schema
        .createTable('drinks', table => {
            table.increments('drink_id');
            table.text('drink_name', 128)
                .notNullable();
            table.text('drink_description', 256)
                .notNullable();
        })
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('drinks')
};
