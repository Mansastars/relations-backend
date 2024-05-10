import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import GeneralContact from "../../models/generalContacts/generalContacts";

export const getAllContacts = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const allContacts = await GeneralContact.findAll({where: {owner_id:userId}})

        if (allContacts.length === 0){
            return response.status(200).json({
                status:"success",
                message:"You currently have no contacts",
            })
        }
        if (allContacts.length > 0){
            return response.status(200).json({
                status:"success",
                message:`You currently have ${allContacts.length} contacts`,
                data:allContacts
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