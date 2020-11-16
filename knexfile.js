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
  production: {
    client: "pg",
    connection: {
      host: "ec2-52-208-175-161.eu-west-1.compute.amazonaws.com",
      database: "df3h17othv4tfd",
      user: "zttctcafdygypc",
      password: "7c50617ffb9e6a147a1397972a1376a2fe07cb277f822c3ff1b0af5eef938756",
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
