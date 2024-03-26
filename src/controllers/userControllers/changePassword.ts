import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User, { UserAttributes } from "../../models/userModel/userModel";
import bcrypt from "bcryptjs";
import { hashPassword } from "../../helpers/helpers";

export const changePassword = async (request: JwtPayload, response: Response) => {
  try {
    const userId = request.user.id;
    const { old_password, new_password, confirm_password } = request.body;
    
    if(old_password === new_password){
      return response.status(400).json({
        status:`error`,
        message:`You can not use your current password`
      })
    }

    if(new_password !== confirm_password){
      return response.status(400).json({
        status:`error`,
        message:`new password and confirm password does not match`
      })
    }

    const user = await User.findOne({ where: { id: userId } }) as unknown as UserAttributes
    if(!user){
      return response.status(400).json({
        status:`error`,
        message:`You have to login`
      })
    }

    const validatePassword = await bcrypt.compare(old_password, user.password)
    if(!validatePassword){
      return response.status(400).json({
        status:`error`,
        message:`Your old password is incorrect`
      })
    }
    if(validatePassword){
      const passwordHash = await hashPassword(new_password);

      const updatedPassword = await User.update({password:passwordHash},{where:{id:userId}})
      return response.status(200).json({
        status:`success`,
        message:`Password successfully changed`
      })
    }
    
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};
