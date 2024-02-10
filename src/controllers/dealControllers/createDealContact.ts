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
    // const meeting = new Date()
    const findContact = (await Contact.findOne({
      where: { email, deal_id, owner_id:userId },
    })) as unknown as ContactAttributes;
    if (findContact) {
      return response.status(400).json({
        status: `error`,
        message: `${first_name} ${last_name} already exists on this deal`,
      });
    }
    const newContact = await Contact.create({
      id: contactId,
      owner_id: userId,
      deal_id,
      first_name,
      last_name,
      organization_name: organization_name || ``,
      deal_size: deal_size || 0,
      email: email,
      phone_number: phone_number || '1234567890',
      stage,
      meeting_date: meeting_date || new Date(),
      notes: notes || 'No notes available',
      createdAt: new Date(),
      updatedAt: new Date(),
  });
  return response.status(200).json({
    status: `success`,
    message: `Contact successfully created`,
  });

    console.log(request.body)
    if(!newContact){
      return response.status(200).json({
        status: `error`,
        message: `unable to create contact`,
      });
  }
  
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      method: request.method,
      message: error.message,
    });
  }
};
