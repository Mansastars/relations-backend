import { JwtPayload } from "jsonwebtoken";
import { Response } from 'express'
import Deal from "../../models/dealModel/dealModel";

export const deleteDeal = async (request: JwtPayload, response: Response) => {
    try {
        const userId = request.user.id;
        const deal_id = request.params.id;
        const deal = await Deal.findOne({ where: { owner_id: userId, deal_id } })
        if (!deal) {
            return response.status(400).json({
                status: "error",
                message: `Unable to delete this deal`
            })
        }
        if (deal) {
            const deletedDeal = await Deal.destroy({ where: { owner_id: userId, deal_id } })
            if (deletedDeal) {
                return response.status(200).json({
                    status: "success",
                    message: `successfully deleted`,
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
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}