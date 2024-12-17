import { Request, Response } from "express";
import User, { UserAttributes, role } from "../../models/userModel/userModel";
import { v4 } from "uuid";
import { generateVerificationToken, hashPassword } from "../../helpers/helpers";
import { SendEmailVerification } from "../../utilities/notifications";
import CompanyStaff from "../../models/companyStaff/CompanyStaff";

export const registerUser = async (request: Request, response: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      type,
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
      role: type === 'User' ?  role.USER : role.COMPANY,
      on_trial: true,
      is_subscribed: true,
      isVerified: false,
      isBlocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }) as unknown as UserAttributes;

    const userIsStaff = await CompanyStaff.findOne({where:{email}})
    if(userIsStaff){
      await CompanyStaff.update(
        { staffId: userId },
        { where: { email } }
      );
    }

    const findUser = (await User.findOne({
      where: { email },
    })) as unknown as UserAttributes;
    if (!findUser) {
      return response.status(400).json({
        status: `error`,
        message: `User not registered, contact admin`,
      });
    }

    const data ={
      id:userId,
      email:email
    }
    const token = generateVerificationToken(data)
    SendEmailVerification(email, token)
    return response.status(200).json({
      status: `success`,
      message: `Registration Successfully and verification email sent`,
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
