import { Request, Response } from "express";
import { Jwt, JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel/userModel";

export const updateProfile = async (request: JwtPayload, response: Response) => {
  try {
    const userId = request.user.id;
    const { first_name, last_name, phone_number, bio } = request.body;
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      await User.update(
        {
          first_name,
          last_name,
          phone_number,
          bio,
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
    }
    return response.status(400).json({
      status: "error",
      message: "Unable to update profile",
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
