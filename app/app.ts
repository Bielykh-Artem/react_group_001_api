import * as Koa from "koa";
import config from "./config";
import middlewares from "./middlewares";
import * as koaSwagger from "koa2-swagger-ui";
import { swaggerInterceptResponse, swaggerInterceptRequest } from "./swagger";
import { swaggerAPI } from "./routes/swagger";
import * as Router from "koa-router";
import { getAliveHandler } from "./controllers/utils.controller";
import router from "./routes";
import { Model } from "objection";
import * as passport from "koa-passport";
import * as Knex from "knex";

const env = process.env.NODE_ENV || "development";
const { host, port, app_url } = config;
const app: Koa = new Koa();
const knexConfig = require("../knexfile")[env];

const knex = Knex(knexConfig);

knex.migrate.latest();

Model.knex(knex);

knex
  .raw("select 1+1 as result")
  .then(() => {
    console.log("Connection to banking successfully completed");
  })
  .catch((err: any) => console.log("Connection banking error:", err));

app.use(passport.initialize());
app.use(passport.session());

app.use(middlewares());

const publicRouter = new Router({ prefix: "/api/v1" });
publicRouter.get("/alive", getAliveHandler).get("/_api.json", swaggerAPI);

app.use(publicRouter.routes());
app.use(router.routes());
app.use(
  // @ts-ignore
  koaSwagger({
    routePrefix: "/swagger",
    swaggerOptions: {
      url:
        env === "development" ? `http://${host}:${port}/api/v1/_api.json` : `${app_url}/api/v1/_api.json`,
      requestInterceptor: swaggerInterceptRequest,
      responseInterceptor: swaggerInterceptResponse,
      modelPropertyMacro: () => {},
    },
  }),
);

app.on("error", (err, ctx) => {
  console.error(err);
});

app.listen(port, host, () => console.log(`listening on http://${host}:${port}`));
