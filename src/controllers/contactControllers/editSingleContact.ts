import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Contact from "../../models/contactModel/contactModel";
import GeneralContact from "../../models/generalContacts/generalContacts";

export const editSingleContact = async (request: JwtPayload, response: Response) => {
  try {
    const contactId = request.params.contactId
    const { title,
      first_name,
      last_name,
      gender,
      organization_name,
      linkedin_url,
      email,
      phone_number,
      profile_pic,
      rating,
      notes } = request.body
    if (!contactId) {
      return response.status(400).json({
        status: `error`,
        message: `Contact id is required`
      })
    }
    await GeneralContact.update(
      {
        title,
        first_name,
        last_name,
        gender,
        organization_name,
        linkedin_url,
        email,
        phone_number,
        profile_pic,
        rating,
        notes
      },
      { where: { id: contactId } }
    );
    const updatedUser = await GeneralContact.findOne({ where: { id: contactId } })

    return response.status(200).json({
      status: "success",
      message: `Successfully updated`,
      data: updatedUser
    }); 
  } catch (error: any) {
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}}
