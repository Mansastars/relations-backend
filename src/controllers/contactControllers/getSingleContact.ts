import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import Contact from "../../models/contactModel/contactModel";

export const getSingleContact = async (request:JwtPayload ,response:Response) => {
    try{
        // const userId = request.user.id;
        const dealId = request.params.id
        const contactId = request.params.contactId

        const contact = await Contact.findOne({where: {id:contactId, deal_id:dealId}})
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
                contact
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