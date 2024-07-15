import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel/userModel";

export const updateProfilePhoto = async (request:JwtPayload, response:Response)=>{
    const data = request.body
    const userId = request.user.id;
    try{
        const picture = data.picture
        const user = await User.findOne({where: {id:userId}})
        if (!user){
            return response.status(400).json({
                status:"error",
                message:"Profile photo update failed",
            })
        }
        const profilePicture = await User.update({profile_picture:picture},{where:{id:userId}})
        return response.status(200).json({
            status:"success",
            message:"Profile photo updated successfully",
        })
    }catch(error:any){
        console.log(error)
        return response.status(500).json({
            status: `error`,
            message: `Internal server error`,
            error: error.message
        })
    }
}