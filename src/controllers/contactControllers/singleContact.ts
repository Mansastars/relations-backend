import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import Contact from "../../models/contactModel/contactModel";
import GeneralContact from "../../models/generalContacts/generalContacts";

export const singleContact = async (request:JwtPayload ,response:Response) => {
    try{
        const contactId = request.params.contactId

        const contact = await GeneralContact.findOne({where: {id:contactId}})
        if (!contact){
            return response.status(400).json({
                status:"error",
                message:"contact not found",
            })
        }
        if (contact){
            return response.status(200).json({
                status:"success",
                message:`${contact.first_name} successfully found`,
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