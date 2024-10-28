import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import GeneralContact from "../../models/generalContacts/generalContacts";
import { template1 } from "../../utilities/notifications/broadCastMail/template1";
import { formatName } from "../../helpers/helpers";

export const sendBroadCastEmail = async (
  request: JwtPayload,
  response: Response
) => {
  const userId = request.user.id;
  const {
    sender_email,
    recipients_email,
    subject,
    email_content,
    send_to_all,
    name,
    address,
    phone_number,
    logo,
  } = request.body;
  try {
    if (send_to_all == true) {
      const allContacts = await GeneralContact.findAll({
        where: { owner_id: userId },
      });
      allContacts.map((contact) => {
        template1(
          sender_email,
          contact.email,
          subject
            .replace("{first_name}", formatName(contact.first_name) || "")
            .replace("{last_name}", formatName(contact.last_name) || ""),
          email_content
            .replace("{first_name}", formatName(contact.first_name) || "")
            .replace("{last_name}", formatName(contact.last_name) || ""),
          address,
          name,
          logo,
          phone_number
        );
      });
    } else {
      const allContacts = recipients_email.split(" ");
      console.log(allContacts);
      allContacts.map(async (contact: any) => {
        const userDetails:any = await GeneralContact.findOne({where:{email:contact, owner_id:userId}})
        template1(
          sender_email,
          contact,
          subject
            .replace("{first_name}", formatName(userDetails.first_name) || "")
            .replace("{last_name}", formatName(userDetails.last_name) ||""),
          email_content
            .replace("{first_name}", formatName(userDetails.first_name) || "")
            .replace("{last_name}", formatName(userDetails.last_name) ||""),
          address,
          name,
          logo,
          phone_number
        );
      });
    }
    return response.status(200).json({
      status: "success",
      message: `Successfully Sent`,
    });
  } catch (error: any) {
    return response.status(500).json({
      status: "error",
      message: `Internal Server Error`,
    });
  }
};
