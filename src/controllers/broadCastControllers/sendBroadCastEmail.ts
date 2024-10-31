import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import GeneralContact from "../../models/generalContacts/generalContacts";
import { template1 } from "../../utilities/notifications/broadCastMail/template1";
import { formatName } from "../../helpers/helpers";

export const sendBroadCastEmail = async (
  request: JwtPayload,
  response: Response
) => {
  console.log(request.body);
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
      console.group(allContacts);
      if (!allContacts) {
        return response.status(400).json({
          status: "error",
          message: `user not found`,
        });
      }
      for (const contact of allContacts) {
        console.log(contact);
        const formattedSubject = subject
          .replace("{first_name}", formatName(contact.first_name) || "")
          .replace("{last_name}", formatName(contact.last_name) || "");
        const formattedContent = email_content
          .replace("{first_name}", formatName(contact.first_name) || "")
          .replace("{last_name}", formatName(contact.last_name) || "");

        const emailResponse = await template1(
          sender_email,
          contact.email,
          formattedSubject,
          formattedContent,
          address,
          name,
          phone_number
        );
        console.log(emailResponse);
      }
    } else {
      const allEmails = recipients_email?.split(",") || [];
      console.log(allEmails);

      for (const contactEmail of allEmails) {
        const userDetails = await GeneralContact.findOne({
          where: { email: contactEmail, owner_id: userId },
        });
        console.log(userDetails);
        let formattedSubject = subject.replace("{first_name}", '').replace("{last_name}",'');
        let formattedContent = email_content.replace("{first_name}", '').replace("{last_name}",'');
        if (userDetails) {
          formattedSubject = subject
            .replace("{first_name}", formatName(userDetails?.first_name))
            .replace("{last_name}", formatName(userDetails?.last_name));

          formattedContent = email_content
            .replace("{first_name}", formatName(userDetails?.first_name))
            .replace("{last_name}", formatName(userDetails?.last_name));
        }
        const emailResponse = await template1(
          sender_email,
          contactEmail,
          formattedSubject,
          formattedContent,
          address,
          name,
          phone_number
        );
        console.log(emailResponse);
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
