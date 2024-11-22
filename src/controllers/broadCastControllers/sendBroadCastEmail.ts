import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import GeneralContact from "../../models/generalContacts/generalContacts";
import { template1 } from "../../utilities/notifications/broadCastMail/template1";
import { formatName } from "../../helpers/helpers";
import Bull from 'bull';
import Contact from "../../models/contactModel/contactModel";

const emailQueue = new Bull('emailQueue', {
  limiter: {
    max: 1, // max number of jobs processed
    duration: 1000 * 5 // within one minute (adjust as needed)
  },
  redis: {
    host: '127.0.0.1', // Redis is running locally
    port: 6379,
  },
});

emailQueue.process(async (job) => {
  const { sender_email, to, subject, content, address, name, phone_number } = job.data;
  await template1(sender_email, to, subject, content, address, name, phone_number);
});

emailQueue.on('completed', (job) => {
  console.log(`Email sent successfully to ${job.data.to}`);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Failed to send email to ${job.data.to}`, err);
});

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
    default_first_name,
    default_last_name,
    default_company_name
  } = request.body;

  try {
    let emailsToSend = [];
    if (send_to_all === true) {
      const allContacts = await Contact.findAll({
        where: { owner_id: userId },
      });
      if (!allContacts) {
        return response.status(400).json({
          status: "error",
          message: `You have no contacts`,
        });
      }

      emailsToSend = allContacts.map(contact => ({
        to: contact.email,
        subject: subject.replaceAll("{first_name}", formatName(contact.first_name) || default_first_name)
                        .replaceAll("{last_name}", formatName(contact.last_name) || default_last_name)
                        .replaceAll("{comapany_name}", formatName(contact.last_name) || default_company_name),
        content: email_content.replaceAll("{first_name}", formatName(contact.first_name) || default_first_name)
                              .replaceAll("{last_name}", formatName(contact.last_name) || default_last_name)
                              .replaceAll("{comapany_name}", formatName(contact.last_name) || default_company_name)
      }));
    } else {
      const  emails= recipients_email
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const allEmails = emails.match(emailRegex) || [];

      for (const contactEmail of allEmails) {
        const userDetails = await GeneralContact.findOne({
          where: { email: contactEmail, owner_id: userId },
        });
        let formattedSubject = ''
        let formattedContent = ''
        if (userDetails) {
          formattedSubject = subject
            .replaceAll("{first_name}", formatName(userDetails?.first_name) || default_first_name)
            .replaceAll("{last_name}", formatName(userDetails?.last_name) || default_last_name)
            .replaceAll("{company_name}", formatName(userDetails.organization_name) || default_company_name);

          formattedContent = email_content
            .replaceAll("{first_name}", formatName(userDetails?.first_name) || default_first_name)
            .replaceAll("{last_name}", formatName(userDetails?.last_name) || default_last_name)
            .replaceAll("{company_name}", formatName(userDetails.organization_name) || default_company_name);
        }else{
          formattedSubject = subject.replaceAll("{first_name}", default_first_name)
          .replaceAll("{last_name}", default_last_name)
          .replaceAll("{company_name}", default_company_name);
          formattedContent = email_content.replaceAll("{first_name}", default_first_name)
          .replaceAll("{last_name}", default_last_name)
          .replaceAll("{company_name}", default_company_name);
        }

        emailsToSend.push({ to: contactEmail, subject: formattedSubject, content: formattedContent });
      }
    }

    for (const email of emailsToSend) {
      emailQueue.add({
        sender_email,
        to: email.to,
        subject: email.subject,
        content: email.content,
        address,
        name,
        phone_number
      }, { attempts: 3, backoff: 5000 });
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
