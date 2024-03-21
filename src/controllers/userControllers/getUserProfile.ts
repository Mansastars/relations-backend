import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express'
import User, { UserAttributes } from "../../models/userModel/userModel";

export const getUserProfile = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const user = await User.findOne({where: {id:userId}}) as unknown as UserAttributes;
        console.log(userId)



        //To calculate number of days from account creation
    const currentDate:any = new Date()
    const userCreatedDate: any = user.createdAt
    const numberOfDays: any = Number((currentDate - userCreatedDate) / (1000 * 60 * 60 * 24))
    const numberOfDaysLeft = 7 - numberOfDays

    //to show banner
    let showBanner = null
    if(numberOfDays < 7 && user.subscription_name === null){
      showBanner = true
    }else{
      showBanner = false
    }

    //to show billing page
    let showBilling = null
    if(numberOfDays > 7 && user.subscription_name === null){
        showBilling = true
    }else{
        showBilling = false
    }
        if (user){
            return response.status(200).json({
                status:"success",
                message:"User Profile successful found",
                user,
                showBanner,
                showBilling
            })
        }
        console.log(userId)
        return response.status(404).json({
            status:"error",
            message:"User not found, contact admin"
        })
    }catch(error:any){
        console.log(error.message);
        return response.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}