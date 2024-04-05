import { Response } from "express";
import User, { UserAttributes } from "../../models/userModel/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { hashPassword } from "../../helpers/helpers";

export const resetPassword = async (request: JwtPayload, response: Response) => {
    try {
        const token = request.params.token
        const { new_password, confirm_password } = request.body

        const decode: any = jwt.verify(token, `${process.env.APP_SECRET}`);
        const userId = decode.id;
        const user = (await User.findOne({
            where: { id: userId },
        })) as unknown as UserAttributes;

        if (!user) {
            return response.status(400).json({
                status: `error`,
                message: `Password reset failed`,
            });
        }

        if(new_password !== confirm_password){
            return response.status(400).json({
                status: `error`,
                message: `Password does not match`,
            });
        }
        const newPassword = await hashPassword(new_password)

        const updatePassword = await User.update({password: newPassword}, {where:{id:userId}}) 

        return response.status(200).json({
            status: `success`,
            message: `Your password has been successfuly changed`,
        });

    } catch (error: any) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};

