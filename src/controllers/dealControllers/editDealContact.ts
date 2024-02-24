import { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
import Contact from "../../models/contactModel/contactModel";


export const editDealContact = async (request: JwtPayload, response: Response) => {
    try {
        const {
            title,
            first_name,
            last_name,
            organization_name,
            deal_size,
            email,
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
            message: `${first_name} ${last_name} was successfully updated`
        })

    } catch (error: any) {
        console.log(error.message)
        return response.status(500).json({
            status: `error`,
            message: `Internal server error`
        })
    }
}