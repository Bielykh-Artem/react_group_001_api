import * as Router from "koa-joi-router";

import {
  signIn,
  signUp,
  accountActivation,
  forgotPassword,
  resetPassword,
  retriveUserBeforeActivation,
} from "../controllers/auth.controller";

const auth = Router();
auth.prefix("/auth");

auth.route({
  method: "get",
  path: "/login",
  meta: {},
  validate: {},
  handler: signIn,
});

auth.route({
  method: "post",
  path: "/registration",
  meta: {},
  validate: {},
  handler: signUp,
});

auth.route({
  method: "post",
  path: "/activation",
  meta: {},
  validate: {},
  handler: accountActivation,
});

auth.route({
  method: "post",
  path: "/forgot-password",
  meta: {},
  validate: {},
  handler: forgotPassword,
});

auth.route({
  method: "post",
  path: "/reset-password",
  meta: {},
  validate: {},
  handler: resetPassword,
});

auth.route({
  method: "get",
  path: "/:id",
  meta: {},
  validate: {},
  handler: retriveUserBeforeActivation,
});

export default () => auth;
