import { Request, Response } from "express";
import User, { UserAttributes, role } from "../../models/userModel/userModel";
import { v4 } from "uuid";
import { generateRegisterToken, hashPassword } from "../../helpers/helpers";

export const registerUser = async (request: Request, response: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    } = request.body;

    const checkUserEmail = await User.findOne({ where: { email } });

    if (checkUserEmail) {
      return response.status(400).json({
        status: `error`,
        message: `${email} is already in use`,
      });
    }

    if (password !== confirm_password) {
      return response.status(400).json({
        status: `error`,
        message: `Password mismatch`,
      });
    }

    const userId = v4();

    const passwordHash = await hashPassword(password);

    const newUser = await User.create({
      id: userId,
      first_name,
      last_name,
      email,
      password: passwordHash,
      role: role.USER,
      on_trial: true,
      is_subscribed: true,
      isVerified: false,
      isBlocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }) as unknown as UserAttributes;

    const findUser = (await User.findOne({
      where: { email },
    })) as unknown as UserAttributes;
    if (!findUser) {
      return response.status(400).json({
        status: `error`,
        message: `User not registered, contact admin`,
      });
    }
    return response.status(200).json({
      status: `success`,
      message: `User Registered Successfully`,
      findUser,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      method: request.method,
      message: error.message,
    });
  }
};
