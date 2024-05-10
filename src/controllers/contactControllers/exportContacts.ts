import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import GeneralContact from "../../models/generalContacts/generalContacts";

export const exportContacts = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const allContacts = await GeneralContact.findAll({where: {owner_id:userId}})

        const data:any = []
        allContacts.map((item:any)=>{
            const contact = {
                first_name: item.first_name,
                last_name: item.last_name,
                organization_name: item.organization_name,
                gender: item.gender,
            }
            data.push(contact)
        })
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
                data
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