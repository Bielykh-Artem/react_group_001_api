import { ParameterizedContext } from "koa";
import { getAuthUser, createNewUser, userActivation, userForgotPassword, userResetPassword } from "../services";

export const signIn = async (ctx: ParameterizedContext) => {
  const { body } = ctx.request;

  const { token } = await getAuthUser(body);
  ctx.ok({ token });
};

export const signUp = async (ctx: ParameterizedContext) => {
  const {
    body,
    headers: { origin },
  } = ctx.request;

  const savedUser = await createNewUser(body, origin);
  ctx.ok(savedUser);
};

export const accountActivation = async (ctx: ParameterizedContext) => {
  const { body } = ctx.request;

  const activatedUser = userActivation(body);
  ctx.ok(activatedUser);
};

export const forgotPassword = async (ctx: ParameterizedContext) => {
  const {
    body,
    headers: { origin },
  } = ctx.request;

  const user = await userForgotPassword(body, origin);
  ctx.ok(user);
};

export const resetPassword = async (ctx: ParameterizedContext) => {
  const { body } = ctx.request;

  const user = await userResetPassword(body);
  ctx.ok(user);
};

export const retriveUserBeforeActivation = async (ctx: ParameterizedContext) => {
  const {
    params: { id },
  } = ctx.request;

  const user = await userResetPassword(JSON.parse(id));
  ctx.ok(user);
};
