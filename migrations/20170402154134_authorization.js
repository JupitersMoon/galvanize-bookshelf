exports.up = function(knex) {
  return knex.schema.createTable('favorites', table => {
    table.increments();
    table.string('book_id').notNullable();
    .onDelete('CASCADE');
    table.string('user_id').notNullable();
    .onDelete('CASCADE');
    table.timestamps(true,true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites')
};
