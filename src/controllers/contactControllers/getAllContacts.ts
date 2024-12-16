import { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
import GeneralContact from "../../models/generalContacts/generalContacts";
import User, { role } from "../../models/userModel/userModel";
import CompanyStaff, {
  CompanyStaffAttributes,
} from "../../models/companyStaff/CompanyStaff";

export const getAllContacts = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    const userId = request.user.id;
    const user = await User.findOne({ where: { id: userId } });
    let allContacts = await GeneralContact.findAll({
      where: { owner_id: userId },
    });
    console.log('user contacts length:', allContacts.length)

    // Check if the user is a company
    if (user?.role === role.COMPANY) {
      // Fetch all staff for the company and filter out entries with invalid or null staffId
      const validStaffs = await CompanyStaff.findAll({
        where: { companyId: userId },
      }).then((staffs) =>
        staffs.filter((staff) => typeof staff.dataValues.staffId === "string")
      );

      if (validStaffs.length > 0) {
        // Collect valid staff IDs and remove undefined values
        const staffIds = validStaffs
          .map((staff) => staff.dataValues.staffId)
          .filter((id): id is string => typeof id === "string"); // Type assertion for TypeScript

        // Fetch staff contacts
        const staffContacts = await GeneralContact.findAll({
          where: { owner_id: staffIds },
        });

        // Combine user contacts with staff contacts
        allContacts = [...allContacts, ...staffContacts];
      }
    } else {
      const userCompany = await CompanyStaff.findOne({
        where: { staffId: userId },
      });
      console.log('user company id:',userCompany?.dataValues.companyId)
      if (userCompany) {
        const companyContacts = await GeneralContact.findAll({
          where: { owner_id: userCompany.dataValues.companyId },
        });
        
        console.log('user company contacts length:', companyContacts.length)
        allContacts = [...allContacts, ...companyContacts];

        const companyStaffs = await CompanyStaff.findAll({
          where: { companyId: userCompany.dataValues.companyId },
        }).then((staffs) =>
          staffs.filter(
            (staff) =>
              typeof staff.dataValues.staffId === "string" &&
              staff.dataValues.staffId !== userId
          )
        );

        if (companyStaffs.length > 0) {
          // Collect valid staff IDs and remove undefined values
          const staffIds = companyStaffs
            .map((staff) => staff.dataValues.staffId)
            .filter((id): id is string => typeof id === "string"); // Type assertion for TypeScript

          // Fetch staff contacts
          const staffContacts = await GeneralContact.findAll({
            where: { owner_id: staffIds },
          });

          // Combine user contacts with staff contacts
          allContacts = [...allContacts, ...staffContacts];
        }
      }
    }

    if (allContacts.length === 0) {
      return response.status(200).json({
        status: "success",
        message: "You currently have no contacts",
        data: [],
      });
    }
    if (allContacts.length > 0) {
      return response.status(200).json({
        status: "success",
        message: `You currently have ${allContacts.length} contacts`,
        data: allContacts,
      });
    }
    return response.status(404).json({
      status: "error",
      message: "No contacts found, contact admin",
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
