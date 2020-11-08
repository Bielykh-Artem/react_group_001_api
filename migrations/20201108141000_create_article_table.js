exports.up = function (knex) {
    return knex.schema.createTable("article", table => {
      table.increments();
  
      table.string("title").notNullable();
      table.string("description").notNullable();
      table.string("image_url").notNullable();
  
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by");
  
      table.timestamp("updated_at");
      table.string("updated_by");
  
      table.boolean("is_active").notNullable().defaultTo(true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("article");
  };
  