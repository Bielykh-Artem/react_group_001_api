import User from "./../models/User";
import * as HttpStatus from "http-status-codes";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";

const mailgun = require("mailgun-js")({ domain: "test", apiKey: "test" });

export const getAuthUser = async (body: { [key: string]: string | number }): Promise<any> => {
  const { email } = body;

  const foudUser = await User.query().where({ email }).first();

  if (foudUser) {
    if (bcrypt.compareSync(body.password as string, foudUser.password)) {
      const { password, ...rest } = foudUser;

      const token = jwt.sign({ user: rest }, "SSdcjwbgfohv/AsaDcjhoahd"); // SECRET
      return { token, user: rest };
    } else {
      throw {
        message: "Permission denied",
        status: HttpStatus.FORBIDDEN,
      };
    }
  } else {
    throw {
      message: "User with such email does not exist",
      status: HttpStatus.NOT_FOUND,
    };
  }
};

export const createNewUser = async (body: { [key: string]: string | number }, origin: string): Promise<any> => {
  const existUser = await User.query().where({ email: body.email }).first();

  if (existUser) {
    throw {
      message: "User with such email already exist",
      status: HttpStatus.CONFLICT,
    };
  } else {
    const newUser = await User.query().insertAndFetch({
      ...body,
      is_active: false,
      created_at: new Date(),
      created_by: "Sign Up page",
    });

    const emailVerificationToken = jwt.sign(
      {
        exp: moment().add(1, "hours").valueOf(), // 1 hour
        data: newUser.id,
      },
      "DFGdskjfiehweif39534hdgvfm2ebb", // EMAIL_VERIFICATION_SECRET
    );

    const data = {
      from: "Excited User <me@samples.mailgun.org>",
      to: newUser.email,
      subject: "Hello",
      text: `To activate your account, follow the link: ${origin}/activation/${emailVerificationToken}`,
    };

    mailgun.messages().send(data);

    return newUser;
  }
};

export const userActivation = async (body: { [key: string]: any }): Promise<any> => {
  const user: { [key: string]: any } = {
    ...body,
    is_active: true,
    password: bcrypt.hashSync(body.password as string, 10),
  };

  const { id, ...rest } = user;

  return await User.query().updateAndFetchById(id, rest);
};

export const userForgotPassword = async (body: { [key: string]: any }, origin: string): Promise<any> => {
  const existUser = await User.query().where({ email: body.email }).first();

  if (!existUser) {
    throw {
      message: "User with such email already exist",
      status: HttpStatus.CONFLICT,
    };
  } else {
    const emailVerificationToken = jwt.sign(
      {
        exp: moment().add(1, "hours").valueOf(), // 1 hour
        data: existUser.id,
      },
      "DFGdskjfiehweif39534hdgvfm2ebb",
    );

    const data = {
      from: "Excited User <me@samples.mailgun.org>",
      to: existUser.email,
      subject: "Hello",
      text: `To change password, follow the link: ${origin}/reset/${emailVerificationToken}`,
    };

    mailgun.messages().send(data);

    return existUser;
  }
};

export const userResetPassword = async (body: { [key: string]: any }): Promise<any> => {
  const { password, userId } = body;

  const hash = bcrypt.hashSync(password, 10);
  return await User.query().updateAndFetchById(userId, { password: hash });
};

export const fetchUserForActivation = async (id: number): Promise<any> => {
  return await User.query().where({ id }).first();
};
