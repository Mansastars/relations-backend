import { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
import Contact from "../../models/contactModel/contactModel";
import Deal from "../../models/dealModel/dealModel";


export const editDealContact = async (request: JwtPayload, response: Response) => {
    try {
        const {
            title,
            first_name,
            last_name,
            organization_name,
            deal_size,
            email,
            profile_pic,
            phone_number,
            stage,
            meeting_date,
            notes
        } = request.body;
        const userId = request.user.id;
        const dealId = request.params.id;
        const contactId = request.params.contactId

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
            title: title || findContact.title,
            first_name: first_name || findContact.first_name,
            last_name: last_name || findContact.last_name,
            organization_name: organization_name || findContact.organization_name,
            deal_size: deal_size || findContact.deal_size,
            email: email || findContact.email,
            phone_number: phone_number || findContact.phone_number,
            stage: stage || findContact.stage,
            meeting_date: meeting_date || findContact.meeting_date,
            profile_pic: profile_pic || findContact.profile_pic,
            notes: notes || findContact.notes,
            updatedAt: new Date(),
        }, { where: { id: contactId, deal_id: dealId, owner_id: userId } })
        if (!updatedContact) {
            return response.status(400).json({
                status: `error`,
                message: `Unable to update contact, try again`
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `${findContact.first_name} ${findContact.last_name} was successfully updated`
        })

    } catch (error: any) {
        console.log(error.message)
        return response.status(500).json({
            status: `error`,
            message: `Internal server error`
        })
    }
}