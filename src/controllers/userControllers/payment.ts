import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { generateToken } from "../../helpers/helpers";

export const payment = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;


    const user = (await User.findOne({
      where: { email: email },
    })) as unknown as UserAttributes;

    if (!user) {
      return response.status(404).json({
        status: `Access denied`,
        message: `User with the email ${email} is not registered`,
      });
    }
    const validate = await bcrypt.compare(password, user.password);

    if (!validate) {
      return response.status(400).json({
        status: `error`,
        message: `Incorrect Password`,
      });
    }

    const data = {
      id: user.id,
      email: user.email,
    };

    const token = generateToken(data);

    return response.status(200).json({
      message: `Welcome back ${user.first_name}`,
      token,
      user,
    });
  } catch (error: any) {
    console.log(error.message);
    response.status(400).json({
      status: `error`,
      method: request.method,
      message: error.message,
    });
  }
};
