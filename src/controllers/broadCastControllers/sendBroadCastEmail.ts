import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import GeneralContact from "../../models/generalContacts/generalContacts";
import { template1 } from "../../utilities/notifications/broadCastMail/template1";

export const sendBroadCastEmail = async (
  request: JwtPayload,
  response: Response
) => {
    const userId = request.user.id
  const {
    sender_email,
    recipients_email,
    subject,
    email_content,
    send_to_all,
    name,
    address,
    phone_number,
    logo
  } = request.body;
  try {
    if(send_to_all == true){
        const allContacts = await GeneralContact.findAll({where: {owner_id:userId}})
        allContacts.map((contact)=>{
            template1(sender_email, contact.email, subject, email_content, address, name, logo,phone_number)
        })
    }else{
        const allContacts = recipients_email.split(' ')
        console.log(allContacts)
        allContacts.map((contact:any)=>{
            template1(sender_email, contact, subject, email_content, address, name, logo,phone_number)
        })
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
