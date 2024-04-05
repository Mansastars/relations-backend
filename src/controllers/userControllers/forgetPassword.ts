import { Request, Response } from "express";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { generateToken } from "../../helpers/helpers";
import { ResetPaaswordMail } from "../../utilities/notifications";

export const forgetPassword = async (request: Request, response: Response) => {
    try {
        const email = request.body.email

        const findUser = await User.findOne({ where: { email } }) as unknown as UserAttributes;

        if (!findUser) {
            return response.status(400).json({
                status: `error`,
                message: `User does not exists`,
            });
        }

        if (findUser) {
            const token = generateToken({
                id: findUser.id,
                email: findUser.email,
            });
            await ResetPaaswordMail(findUser.email, token);
            return response.status(200).json({
                status: `success`,
                message: `A password reset link has been sent to ${email}`,
            });
        }

    } catch (error: any) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};

