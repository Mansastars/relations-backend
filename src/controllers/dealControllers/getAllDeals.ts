import { JwtPayload } from "jsonwebtoken";
import { Response } from 'express'
import Deal from "../../models/dealModel/dealModel";
import User, { UserAttributes } from "../../models/userModel/userModel";

export const getAllDeals = async (request: JwtPayload, response: Response) => {
    try {
        const userId = request.user.id;
        const deals = await Deal.findAll({ where: { owner_id: userId } })

        const user = (await User.findOne({ where: { id: userId }, })) as unknown as UserAttributes;

        //To calculate number of days from account creation
        const currentDate: any = new Date()
        const userCreatedDate: any = user.createdAt
        const numberOfDays: any = Number((currentDate - userCreatedDate) / (1000 * 60 * 60 * 24))
        const numberOfDaysLeft = 7 - numberOfDays

        //to show banner
        let showBanner = null
        if (numberOfDays <= 7 && user.subscription_name === null) {
            showBanner = true
        } else {
            showBanner = false
        }
        //to show billing page
        let showBilling = null
        if(numberOfDays > 7 && user.subscription_name === null){
            showBilling = true
        }else{
            showBilling = false
        }

        if(showBilling === true){
            return response.status(200).json({
                status:`success`,
                message:`You currently do not have an active subscription`,
                showBilling,
                showBanner,
                user,
                deals
            })
        }
        if (deals.length > 0) {
            return response.status(200).json({
                status: "success",
                message: `You currently have ${deals.length} deals`,
                deals,
                showBanner,
                user,
                showBilling
            })
        } else if (deals.length === 0) {
            return response.status(200).json({
                status: "success",
                message: "No deal found",
                showBanner,
                user,
                deals,
                showBilling
            })
        } else {
            return response.status(400).json({
                status: "error",
                message: "please try again",
            })
        }

    } catch (error: any) {
        console.log(error.message);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}