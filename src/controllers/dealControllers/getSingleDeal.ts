import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import Deal from "../../models/dealModel/dealModel";

export const getSingleDeal = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const dealId = request.params.id
        const deal = await Deal.findOne({where: {id:dealId}})
        if (!deal){
            return response.status(400).json({
                status:"error",
                message:"Deal not found",
            })
        }
        if (deal){
            return response.status(200).json({
                status:"success",
                message:`${deal.deal_name} successfully found`,
                deal
            })
        }
       
    }catch(error:any){
        console.log(error.message);
        return response.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}