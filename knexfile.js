module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "react",
      user: "artem",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: "./seeds",
      loadExtensions: [".js"],
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
