import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import CompanyStaff from "../../models/companyStaff/CompanyStaff";

export const deleteStaff = async (request: JwtPayload, response: Response) => {
  const companyId = request.user.id;
  const staffId = request.body.staffId;
  try {
    const staffExist = await CompanyStaff.findOne({
      where: { companyId, staffId },
    });
    if (staffExist) {
      await CompanyStaff.destroy({ where: { staffId, companyId } });
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
