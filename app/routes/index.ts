import * as Router from "koa-router";
import articleRouters from "./articles";

const router = new Router({ prefix: "/api" });

router.use(articleRouters().middleware());

export default router;
