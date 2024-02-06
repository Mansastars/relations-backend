import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import Contact from "../../models/contactModel/contactModel";

export const getOfferContacts = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const stage = "Term Sheet/ Initial Offer"
        const contact = await Contact.findAll({where: {owner_id:userId, stage:stage}})
        if (contact.length === 0){
            return response.status(200).json({
                status:"success",
                message:`You have ${contact.length} contacts on contacted ${stage}` ,
                data: contact
            })
        }
        if (contact.length > 0){
            return response.status(200).json({
                status:"success",
                message:`Contacts in ${stage} stage found`,
                data: contact
            })
        }

    }catch(error:any){
        console.log(error.message);
        return response.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}