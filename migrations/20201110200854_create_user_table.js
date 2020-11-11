exports.up = function (knex) {
    return knex.schema.createTable("user", table => {
      table.increments();
  
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
  
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by");
  
      table.timestamp("updated_at");
      table.string("updated_by");
  
      table.boolean("is_active").notNullable().defaultTo(true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("user");
  };
  