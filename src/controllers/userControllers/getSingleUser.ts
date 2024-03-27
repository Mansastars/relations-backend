import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import User from "../../models/userModel/userModel";

export const getSingleUser = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const contactId = request.params.contactId

        const user = await User.findOne({where: {id:userId}})
        if (!user){
            return response.status(400).json({
                status:"error",
                message:"not found",
            })
        }
        if (user){
            return response.status(200).json({
                status:"success",
                message:`successfully found`,
                user
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