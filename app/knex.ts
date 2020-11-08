import * as Knex from "knex";
import * as pg from "pg";

const env = process.env.NODE_ENV || "development";
const knexConfig = require("../knexfile")[env];

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => {
  return parseFloat(value);
});

export default Knex(knexConfig);
