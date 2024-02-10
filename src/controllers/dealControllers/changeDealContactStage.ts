import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Contact from "../../models/contactModel/contactModel";

export const changeDealContactStage = async (request: JwtPayload, response: Response) => {
  try {
    const userId = request.user.id;
    const deal_id = request.params.id;
    const { first_name, last_name, stage } = request.body;
    const contact = await Contact.findAll({ where: { first_name, last_name, owner_id:userId, deal_id } });
    if(!contact){
        return response.status(400).json({
            status:`error`,
            message:`Unable to change ${first_name} ${last_name} stage on this deal, try again later`
        })
    }
    if (contact) {
      await Contact.update(
        {
          stage
        },
        { where: { first_name, last_name, owner_id:userId, deal_id } }
      );
      const updatedContact = await Contact.findOne({ where: { first_name, last_name, owner_id:userId, deal_id } });

      return response.status(200).json({
        status: "success",
        message: `${first_name} ${last_name} stage successfully updated`,
        data: updatedContact
      });
    }
    return response.status(400).json({
      status: "error",
      message: `Unable to update ${first_name} ${last_name} stage at the moment`,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
