import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import Deal from "../../models/dealModel/dealModel";
import Contact from "../../models/contactModel/contactModel";

export const getSingleDeal = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const dealId = request.params.id
        const data = await Deal.findOne({where: {id:dealId, owner_id:userId}})
        if (!data){
            return response.status(400).json({
                status:"error",
                message:"Deal not found",
            })
        }

        let deal_size = data.deal_size
        let negotiation_value = 0
        let signed_value = 0
        const dealContact = await Contact.findAll({where:{owner_id:userId, deal_id:dealId}})
        for(let i = 0; i < dealContact.length; i++){
            deal_size += dealContact[i].deal_size
            if(dealContact[i].stage === "Negotiation"){
                negotiation_value+= dealContact[i].deal_size
            }
            if(dealContact[i].stage === "Deal/ Agreement signed"){
                signed_value += dealContact[i].deal_size
            }
        }
        const deal = {
            id: data.id,
            owner_id: data.owner_id,
            deal_name: data.deal_name,
            deal_size: deal_size,
            dead_line: data.dead_line,
            negotiation_value: negotiation_value,
            signed_value: signed_value,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }
       
            return response.status(200).json({
                status:"success",
                message:`${data.deal_name} successfully found`,
                deal
            })
        
       
    }catch(error:any){
        console.log(error.message);
        return response.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}