import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { SendEmailVerification, SendInvestorsUpdate } from "../../utilities/notifications";

export const sendUpdate = async (request:JwtPayload, response:Response)=>{
    const data =request.body
    const user = request.user.id
    try{
        if(!user){
            return response.status(400).json({
                status:`error`,
                message:`You have to login/SignUp to use this feature`
            })
        }
        const emails:string = data.recipients_emails
        function filterEmails(recipients:string) {
            // Split the string by commas
            let emails = recipients.split(',');
        
            // Trim spaces from each email and filter out any empty strings
            emails = emails.map(email => email.trim()).filter(email => email !== '');
        
            return emails;
        }
        const recipients = filterEmails(emails)
        console.log(recipients)
        for(let i =0; i <recipients.length, i++;){
            SendInvestorsUpdate(
                recipients[i],
                data.email_subject,
                data.company_description,
                data.founders_profile,
                data.chartImageUrl,
                data.gross_margin,
                data.wins,
                data.lows,
                data.news,
                data.requests,
                data.deck_line,
                data.founders_message,
                data.company_name,
                data.targets,
            )
        }
        return response.status(200).json({
            status: `success`,
            message:`Investor Update Successfully Sent`
        })


    }catch(err:any){
        console.log(err.message)
        return response.status(500).json({
            status: `error`,
            message: err.message,
        });
    }
}