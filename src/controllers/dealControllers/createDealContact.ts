import { Response } from "express";
import { v4 } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import Contact, { ContactAttributes } from "../../models/contactModel/contactModel";
import CompletedContact from "../../models/completedContactsModel/completedContactsModel";

export const createDealContact = async (request: JwtPayload, response: Response) => {
  try {
    const {
      title,
      first_name,
      last_name,
      organization_name,
      linkedin_url,
      gender,
      profile_pic,
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
    const findContact = (await Contact.findOne({
      where: { first_name, last_name, deal_id, owner_id: userId },
    }))
    if (findContact) {
      return response.status(400).json({
        status: `error`,
        message: `${first_name} ${last_name} already exists on this deal`,
      });
    }
    const newContact = await Contact.create({
      title: title || ``,
      id: contactId,
      owner_id: userId,
      deal_id,
      first_name:first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      organization_name: organization_name || ``,
      linkedin_url: linkedin_url || ``,
      gender: gender || ``,
      profile_pic: profile_pic || ``,
      deal_size: deal_size || 0,
      email: email || ``,
      phone_number: phone_number || ``,
      stage,
      meeting_date: meeting_date || null,
      notes: notes || 'No notes available',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!newContact) {
      return response.status(200).json({
        status: `error`,
        message: `unable to create contact`,
      });
    }
    if (title && first_name && last_name && organization_name && linkedin_url && profile_pic && email && phone_number) {
      const CompleteContact = await CompletedContact.create({
        id: v4(),
        title,
        first_name,
        last_name,
        organization_name,
        linkedin_url,
        profile_pic,
        email,
        phone_number,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return response.status(200).json({
      status: `success`,
      message: `Contact successfully created`,
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
