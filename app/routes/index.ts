import * as Router from "koa-router";
import articleRouters from "./articles";
import authRouters from "./auth";

const router = new Router({ prefix: "/api" });

router.use(articleRouters().middleware());
router.use(authRouters().middleware());

export default router;
