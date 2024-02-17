import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import Deal from "../../models/dealModel/dealModel";

export const getSingleDeal = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const deal_id = request.params.id;
        const deal = await Deal.findOne({where: {owner_id:userId, deal_id}})
        if (!deal){
            return response.status(400).json({
                status:"error",
                message:`deal does not exist or can not be found`
            })
        }
        if (deal){
            return response.status(200).json({
                status:"success",
                message:`${deal} successfully found`,
                data: deal
            })
        }

    }catch(error:any){
        return response.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}