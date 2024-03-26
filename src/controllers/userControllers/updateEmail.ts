import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel/userModel";

export const updateEmail = async (request: JwtPayload, response: Response) => {
  try {
    const userId = request.user.id;
    const { email } = request.body;
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      await User.update(
        {
          email,
          isVerified: false,
          updatedAt: new Date()
        },
        { where: { id: userId } }
      );
      const updatedUser = await User.findOne({where: {id:userId}})
      return response.status(200).json({
        status: "success",
        message: "Profile updated",
        data: updatedUser
      });
    }else{
    return response.status(400).json({
      status: "error",
      message: "Unable to update email",
    });
  }
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
