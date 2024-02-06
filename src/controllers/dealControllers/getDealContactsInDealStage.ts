import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import Contact from "../../models/contactModel/contactModel";

export const getDealContacts = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const deal_id = request.params.id;
        const stage = "Deal/ Agreement signed"
        const contacts = await Contact.findAll({where: {owner_id:userId, stage:stage, deal_id}})
        if (contacts){
            return response.status(200).json({
                status:"success",
                message:`${contacts.length} contacts found on ${stage} stage`,
                data: contacts
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