import { Response } from "express";
import { v4 } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import Contact, { ContactAttributes } from "../../models/contactModel/contactModel";

export const createDealContact = async (request: JwtPayload, response: Response) => {
  try {
    const {
        first_name,
        last_name,
        organization_name,
        deal_size,
        email,
        phone_number,
        stage,
        meeting_date,
        notes
    } = request.body;
    const userId = request.user.id;
    const deal_id = request.params.id;

    const contactId = v4();

    const newContact = await Contact.create({
        id: contactId,
        owner_id: userId,
        deal_id,
        first_name,
        last_name,
        organization_name,
        deal_size,
        email,
        phone_number,
        stage,
        meeting_date,
        notes,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const findContact = (await Contact.findOne({
      where: { email },
    })) as unknown as ContactAttributes;
    if (!findContact) {
      return response.status(400).json({
        status: `error`,
        message: `Contact not created, try again`,
      });
    }
    return response.status(200).json({
      status: `success`,
      message: `Contact successfully created`,
      findContact,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      method: request.method,
      message: error.message,
    });
  }
};
