import { JwtPayload } from "jsonwebtoken";
import { Response } from 'express'
import GeneralContact from "../../models/generalContacts/generalContacts";

export const deleteSingleContact = async (request: JwtPayload, response: Response) => {
    try {
        const userId = request.user.id;
        const contact_id = request.params.contactId
        console.log(userId)
        console.log(contact_id)
        const contact = await GeneralContact.findOne({ where: { owner_id: userId, id: contact_id } })
        if (!contact) {
            return response.status(400).json({
                status: "error",
                message: `Unable to delete this contact`
            })
        }
        if (contact) {
            const deletedContact = await GeneralContact.destroy({ where: { owner_id: userId, id: contact_id } })
            if (deletedContact) {
                return response.status(200).json({
                    status: "success",
                    message: `successfully deleted`,
                    data: contact
                })
            }else{
                return response.status(400).json({
                    status: "error",
                    message: `Unable to delete this contact`
                })
            }
        }

    } catch (error: any) {
        console.log(error.message)
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}