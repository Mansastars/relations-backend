import { JwtPayload } from "jsonwebtoken";
import { Response } from 'express'
import Deal from "../../models/dealModel/dealModel";

export const deleteDeal = async (request: JwtPayload, response: Response) => {
    try {
        const userId = request.user.id;
        const dealId = request.params.id;
        const deal = await Deal.findOne({ where: { owner_id: userId, id:dealId } })
        if (!deal) {
            return response.status(400).json({
                status: "error",
                message: `Unable to delete this deal`
            })
        }
        if (deal) {
            const deletedDeal = await Deal.destroy({ where: { owner_id: userId, id:dealId } })
            if (deletedDeal) {
                return response.status(200).json({
                    status: "success",
                    message: `${deal.deal_name} successfully deleted`,
                    data: deal
                })
            }else{
                return response.status(400).json({
                    status: "error",
                    message: `Unable to delete this deal`
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