import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel/userModel";
import Contact from "../../models/contactModel/contactModel";
import { where } from "sequelize";
import { v4 } from "uuid";

export const importContacts = async(request:JwtPayload, response:Response)=>{
    const csv = request.body.data;
    const user = request.user.id;
    try{
        const userExist = await User.findOne({where:{id:user}})
        if(!userExist){
            return response.status(400).json({
                status:`error`,
                message:`You have to login to access this feature`
            })
        }
        if(!csv){
            return response.status(200).json({
                status:`error`,
                message:`You have to upload a valid file`
            })
        }

        const imported = csv.map(async(contact:any)=>{
            await Contact.create({
                title: contact.title || ``,
                id: v4(),
                owner_id: user,
                deal_id:`general`,
                first_name:(contact.first_name).toLowerCase() || ``,
                last_name: (contact.last_name).toLowerCase() || ``,
                organization_name: contact.organization_name || ``,
                linkedin_url: contact.linkedin_url || ``,
                gender: contact.gender || ``,
                profile_pic: contact.profile_pic || ``,
                deal_size: contact.deal_size || 0,
                email: contact.email || ``,
                phone_number: contact.phone_number || ``,
                stage:`none`,
                meeting_date: contact.meeting_date || null,
                notes: contact.notes || 'No notes available',
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        })
        if(imported){
            return response.status(200).json({
                status:`success`,
                message:`Contacts successfully imported`
            })
        }else{
            return response.status(400).json({
                status:`error`,
                message:`Operation failed, Please try again`
            })
        }
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            status:`error`,
            message:`Internal server error`
        })
    }
}