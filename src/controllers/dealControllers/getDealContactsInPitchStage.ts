import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import Contact from "../../models/contactModel/contactModel";
import { formatContacts } from "../../helpers/helpers";

export const getPitchContacts = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const deal_id = request.params.id;
        const stage = "Pitch"
        const contacts = await Contact.findAll({where: {owner_id:userId, stage:stage, deal_id}})
        const output = formatContacts(contacts)
        if (contacts.length === 0 || undefined){
            return response.status(200).json({
                status:"success",
                message:`${contacts.length} contacts found on ${stage} stage` ,
                data: []
            })
        }
        if (contacts.length > 0){
            return response.status(200).json({
                status:"success",
                message:`${contacts.length} contacts found on ${stage} stage` ,
                data: output
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