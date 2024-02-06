import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User, { UserAttributes } from "../../models/userModel/userModel";
import bcrypt from "bcryptjs";
import { hashPassword } from "../../helpers/helpers";

export const changePassword = async (request:JwtPayload, response:Response) => {
  try{
      const userId = request.user.id;
      console.log(userId)

        const {old_password, new_password, confirm_password} = request.body;
        
        const user = await User.findOne({where: {id:userId}}) as unknown as UserAttributes
        console.log(user)
        const validatePassword = await bcrypt.compare(old_password, user.password)
        if (!validatePassword) {
            return response.status(400).json({
              status: `error`,
              message: `Old password is incorrect`,
            });
          }
          if(new_password === old_password){
            return response.status(400).json({
                status: `error`,
                message: `Cannot use previous password`,
              });
          }
        if(new_password !== confirm_password){
            return response.status(400).json({
                status: `error`,
                message: `New password does not match`,
              });
        }
        const hash = await hashPassword(new_password)

      const updatedUser = await User.update(
        { password: hash },
        { where: { id: userId } }
      );

    if (!updatedUser) {
      return response.status(400).json({
        status: `error`,
        message: `Unable to update password, try again`,
      });
    }

    const findUser = await User.findOne({ where: { id: userId } });
    return response.status(200).json({
      status: `success`,
      message: `Password changed successfully`,
      data: findUser,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};
