import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Contact from "../../models/contactModel/contactModel";
import Deal from "../../models/dealModel/dealModel";

export const deleteContactPhoto = async (request: JwtPayload, response: Response)=>{
    const userId = request.user.id;
    const dealId = request.params.id;
    const contactId = request.params.contactId
    try{
        const findContact = (await Contact.findOne({
            where: { id: contactId, deal_id: dealId, owner_id: userId }
        }))
        if (!findContact) {
            return response.status(400).json({
                status: `error`,
                message: `unable to edit contact at this time`
            })
        }
        const dealOwner = await Deal.findOne({where:{id:dealId}})
        if(userId !== dealOwner?.dataValues.owner_id ){
          return response.status(400).json({
            status: `error`,
            message: `You can not edit a contact on this dashboard`,
          });
        }
        const updatedContact = await Contact.update({
            profile_pic: '',
        }, { where: { id: contactId, deal_id: dealId, owner_id: userId } })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            status:`error`,
            message:`Internal Server Error`
        })
    }
}