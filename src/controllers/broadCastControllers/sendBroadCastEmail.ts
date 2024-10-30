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
    if (send_to_all === true) {
      const allContacts = await GeneralContact.findAll({
        where: { owner_id: userId },
      });

      for (const contact of allContacts) {
        const formattedSubject = subject
          .replace("{first_name}", formatName(contact.first_name) || "")
          .replace("{last_name}", formatName(contact.last_name) || "");
        const formattedContent = email_content
          .replace("{first_name}", formatName(contact.first_name) || "")
          .replace("{last_name}", formatName(contact.last_name) || "");

        await template1(
          sender_email,
          contact.email,
          formattedSubject,
          formattedContent,
          address,
          name,
          logo,
          phone_number
        );
      }
    } else {
      const allEmails = recipients_email?.split(",") || [];
      
      for (const contactEmail of allEmails) {
        const userDetails = await GeneralContact.findOne({
          where: { email: contactEmail.trim(), owner_id: userId },
        });

        if (userDetails) {
          const formattedSubject = subject
            .replace("{first_name}", formatName(userDetails.first_name) || "")
            .replace("{last_name}", formatName(userDetails.last_name) || "");
          const formattedContent = email_content
            .replace("{first_name}", formatName(userDetails.first_name) || "")
            .replace("{last_name}", formatName(userDetails.last_name) || "");

          await template1(
            sender_email,
            contactEmail,
            formattedSubject,
            formattedContent,
            address,
            name,
            logo,
            phone_number
          );
        }
      }
    }

    return response.status(200).json({
      status: "success",
      message: `Successfully Sent`,
    });
  } catch (error: any) {
    console.error("Error in sendBroadCastEmail:", error);
    return response.status(500).json({
      status: "error",
      message: `Internal Server Error`,
    });
  }
};
