import { Request, Response } from "express";
import CompanyStaff from "../../models/companyStaff/CompanyStaff";
import User from "../../models/userModel/userModel";
import { JwtPayload } from "jsonwebtoken";
import { v4 } from "uuid";

export const addStaff = async (request: JwtPayload, response: Response) => {
  const companyId = request.user.id;
  const staffEmail = request.body.email;
  try {
    const staffExist = await User.findOne({ where: { email: staffEmail } });
    if (staffExist) {
      await CompanyStaff.create({
        id: v4(),
        companyId,
        staffId: staffExist.id,
        email: staffEmail,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      await CompanyStaff.create({
        id: v4(),
        companyId,
        email: staffEmail,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return response.status(200).json({
      error: false,
      message: "Staff added successfully",
    });
  } catch (error: any) {
    console.log(error.message)
    return response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};