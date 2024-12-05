import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import CompanyStaff from "../../models/companyStaff/CompanyStaff";


export const updateStaff = async(request:JwtPayload, response:Response)=>{
    const companyId = request.user.id;
    const {id, email, permission} = request.body
    console.log(request.body)
    try{
        if(companyId){
            await CompanyStaff.update({email, permission},{where:{companyId, id}})
            return response.status(200).json({
                error:false,
                message:'Updated Successfully',
            })
        }
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            error:true,
            message:'Internal Server Error',
            errorMessage:error.message
        })
    }
}