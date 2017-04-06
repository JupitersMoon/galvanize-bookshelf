exports.up = function(knex) {
  return knex.schema.createTable('favorites', table => {
    table.increments();
    table.integer('book_id').references('books.id').notNullable().onDelete('cascade');
    table.integer('user_id').references('users.id').notNullable().onDelete('cascade');
    table.timestamps(true,true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('favorites')
};
