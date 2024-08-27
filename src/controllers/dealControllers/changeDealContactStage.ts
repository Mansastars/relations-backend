import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Contact from "../../models/contactModel/contactModel";

export const changeDealContactStage = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    const userId = request.user.id;
    const deal_id = request.params.id;
    const { id, stage } = request.body;
    const contact = await Contact.findOne({
      where: { id, owner_id: userId, deal_id },
    });
    if (!contact) {
      return response.status(400).json({
        status: `error`,
        message: `contact not found, try again later`,
      });
    }

    const updateContact = await Contact.update(
      {
        stage,
      },
      { where: { id, owner_id: userId, deal_id } }
    );
    const updatedContact = await Contact.findOne({
      where: { stage, id, owner_id: userId, deal_id },
    });
    if (updatedContact) {
      return response.status(200).json({
        status: "success",
        message: `Stage successfully updated`,
      });
    } else {
      return response.status(400).json({
        status: "error",
        message: `Unable to update stage at the moment`,
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
