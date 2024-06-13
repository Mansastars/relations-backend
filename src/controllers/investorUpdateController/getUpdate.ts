import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel/userModel";
import InvestorsUpdate from "../../models/InvestorUpdateModel/InvestorUpdateModel";

export const getUpdate = async(request:JwtPayload, response:Response)=>{
    const user = request.user.id
    try{
        const userExist = await User.findOne({where:{id:user}})
        if(!userExist){
            return response.status(400).json({
                status:`error`,
                message:`You have to login`
            })
        }
        const userInvestorUpdate = await InvestorsUpdate.findOne({where:{user_id:user}})
        return response.status(200).json({
            status:`success`,
            message:`Investor Update Successfully retrieved`,
            data: userInvestorUpdate
        })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            status:`error`,
            message:`Internal Server Error`
        })
    }
}