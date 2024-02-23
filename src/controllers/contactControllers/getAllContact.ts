import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import Contact from "../../models/contactModel/contactModel";

export const getAllContacts = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const contacts = await Contact.findAll({where: {owner_id:userId}})
        if (contacts.length === 0){
            return response.status(200).json({
                status:"success",
                message:"You currently have no contacts",
            })
        }
        if (contacts.length > 0){
            return response.status(200).json({
                status:"success",
                message:`You currently have ${contacts.length} contacts`,
                contacts
            })
        }
        return response.status(404).json({
            status:"error",
            message:"No contacts found, contact admin"
        })
    }catch(error:any){
        console.log(error.message);
        return response.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}