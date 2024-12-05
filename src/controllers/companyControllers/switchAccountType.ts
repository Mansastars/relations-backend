import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User, { role } from "../../models/userModel/userModel";
import CompanyStaff from "../../models/companyStaff/CompanyStaff";

export const switchAccountType = async (
  request: JwtPayload,
  response: Response
) => {
  const companyId = request.user.id;
  try {
    //find user and check type and update
    const user = await User.findOne({ where: { id: companyId } });
    if (user?.role === role.USER) {
      await User.update({ role: role.COMPANY }, { where: { id: companyId } });
    } else {
      await User.update({ role: role.USER }, { where: { id: companyId } });
      await CompanyStaff.destroy({ where: { companyId } });
    }
    return response.status(200).json({
      error: false,
      message: "successfully switched account",
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
