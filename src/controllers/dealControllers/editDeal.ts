import { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
import Deal from "../../models/dealModel/dealModel";


export const editDeal = async(request:JwtPayload, response: Response) =>{
    try{
        const {deal_name,dead_line,signed_value } = request.body
        const deal_id = request.params.id
        const owner_id = request.user.id
        
        const deal = await Deal.findOne({where: {id: deal_id, owner_id}})
        if(!deal){
            return response.status(400).json({
                status:`error`,
                message:`Deal not found`
            })
        }
        const updatedDeal = await Deal.update({
            deal_name: deal_name || deal.deal_name, 
            dead_line: dead_line || deal.dead_line, 
            signed_value: signed_value || deal.signed_value,
            updatedAt: new Date()
            },{where:{id:deal_id, owner_id}
        })
        if(!updatedDeal){
            return response.status(400).json({
                status:`error`,
                message:`Unable to update deal at the moment`
            })
        }else{
            return response.status(200).json({
                status:`success`,
                message:`${deal_name} was successfully updated`
            })
        }
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            status: `error`,
            message:`Internal server error`
        })
    }
}