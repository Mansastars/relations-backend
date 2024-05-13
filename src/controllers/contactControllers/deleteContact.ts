import { JwtPayload } from "jsonwebtoken";
import { Response } from 'express'
import Contact from "../../models/contactModel/contactModel";

export const deleteContact = async (request: JwtPayload, response: Response) => {
    try {
        const userId = request.user.id;
        const deal_id = request.params.id;
        const contact_id = request.params.contact
        const contact = await Contact.findOne({ where: { owner_id: userId, deal_id, id: contact_id } })
        if (!contact) {
            return response.status(400).json({
                status: "error",
                message: `Unable to delete this contact`
            })
        }
        if (contact) {
            const deletedContact = await Contact.destroy({ where: { owner_id: userId, deal_id, id: contact_id } })
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
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}