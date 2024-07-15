import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel/userModel";

export const deleteProfilePhoto = async (request:JwtPayload, response:Response)=>{
    const userId = request.user.id;
    try{
        const user = await User.findOne({where: {id:userId}})
        if (!user){
            return response.status(400).json({
                status:"error",
                message:"Failed to delete photo",
            })
        }
        const profilePicture = await User.update({profile_picture:''},{where:{id:userId}})
        return response.status(200).json({
            status:"success",
            message:"Profile photo deleted successfully",
        })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            status:`error`,
            message:`Internal Server error`
        })
    }
}