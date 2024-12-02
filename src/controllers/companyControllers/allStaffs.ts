import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import CompanyStaff from "../../models/companyStaff/CompanyStaff";


export const allStaffs = async(request: JwtPayload, response: Response)=>{
    const companyId = request.user.id
    try{
        if(companyId){
            const staffs = await CompanyStaff.findAll({where:{companyId}})
            return response.status(200).json({
                error:false,
                message:'successful',
                data:staffs
            })
        }else{
            return response.status(200).json({
                error:false,
                message:'You have to login',
            })
        }
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            error:true,
            message:'Internal server error',
            errorMessage: error.message
        })
    }
}