import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import Deal from "../../models/dealModel/dealModel";

export const getAllDeals = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const deals = await Deal.findAll({where: {owner_id:userId}})
        if (deals.length === 0){
            return response.status(200).json({
                status:"success",
                message:"You currently have no deals",
            })
        }
        if (deals.length > 0){
            return response.status(200).json({
                status:"success",
                message:`You currently have ${deals.length} deals`,
                deals
            })
        }
        return response.status(404).json({
            status:"error",
            message:"No deal found"
        })
        

    }catch(error:any){
        console.log(error.message);
        return response.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}