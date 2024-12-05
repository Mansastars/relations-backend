import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import CompanyStaff from "../../models/companyStaff/CompanyStaff";

export const deleteStaff = async (request: JwtPayload, response: Response) => {
  const companyId = request.user.id;
  const staffId = request.params.id;
  try {
    const staffExist = await CompanyStaff.findOne({
      where: { companyId, id:staffId },
    });
    if (staffExist) {
      const deleteStaff = await CompanyStaff.destroy({ where: { id:staffId, companyId } });
      return response.status(200).json({
        error: false,
        message: "Staff deleted successfully",
      });
    }else{
      return response.status(404).json({
        error: true,
        message: "Staff not found",
      });
    }
  } catch (error: any) {
    console.log(error.message)
    return response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
