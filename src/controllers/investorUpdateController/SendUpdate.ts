import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { SendInvestorsUpdate } from "../../utilities/notifications";
import InvestorsUpdate from "../../models/InvestorUpdateModel/InvestorUpdateModel";
import { v4 } from "uuid";
import { where } from "sequelize";

// Helper function to filter emails
function filterEmails(recipients:string) {
    // Split the string by commas
    let emails = recipients.split(',');

    // Trim spaces from each email and filter out any empty strings
    emails = emails.map(email => email.trim()).filter(email => email !== '');

    return emails;
}

export const sendUpdate = async (request: JwtPayload, response: Response) => {
    const data = request.body;
    const user = request.user?.id;  // Ensure request.user is defined and accessed properly

    try {
        if (!user) {
            return response.status(400).json({
                status: 'error',
                message: 'You have to login/SignUp to use this feature'
            });
        }

        const userHasInvestorUpdate = await InvestorsUpdate.findOne({where:{user_id:user}})
        if(userHasInvestorUpdate){
            await InvestorsUpdate.update({
                company_name: data.company_name,
                company_description: data.company_description,
                website: data.website,
                deck_line: data.deck_line,
                email_subject: data.email_subject,
                founders_message: data.founders_message,
                founders_profile: data.founders_profile,
                recipients_emails: data.recipients_emails,
                requests: data.requests,
                targets: data.targets,
                user_MoM_growth_rate: data.user_MoM_growth_rate,
                gross_margin: data.gross_margin,
                lows: data.lows,
                wins: data.wins,
                news: data.news,
                cash_in_hand: data.cash_in_hand,
                cash_burn: data.cash_burn,
                logoUrl: data.logoUrl,
                chartImageUrl: data.chartImageUrl,
                januaryMRR: data.januaryMRR,
                februaryMRR: data.februaryMRR,
                marchMRR: data.marchMRR,
                aprilMRR: data.aprilMRR,
                mayMRR: data.mayMRR,
                juneMRR: data.juneMRR,
                julyMRR: data.julyMRR,
                augustMRR: data.augustMRR,
                septemberMRR: data.septemberMRR,
                octoberMRR: data.octoberMRR,
                novemberMRR: data.novemberMRR,
                decemberMRR: data.decemberMRR,
                date: data.date,
                updatedAt: new Date()
            },{where:{user_id:user}})
        }else{
            await InvestorsUpdate.create({
                id:v4(),
                user_id: user,
                company_name: data.company_name,
                company_description: data.company_description,
                website: data.website,
                deck_line: data.deck_line,
                email_subject: data.email_subject,
                founders_message: data.founders_message,
                founders_profile: data.founders_profile,
                recipients_emails: data.recipients_emails,
                requests: data.requests,
                targets: data.targets,
                user_MoM_growth_rate: data.user_MoM_growth_rate,
                gross_margin: data.gross_margin,
                lows: data.lows,
                wins: data.wins,
                news: data.news,
                cash_in_hand: data.cash_in_hand,
                cash_burn: data.cash_burn,
                logoUrl: data.logoUrl,
                chartImageUrl: data.chartImageUrl,
                januaryMRR: data.januaryMRR,
                februaryMRR: data.februaryMRR,
                marchMRR: data.marchMRR,
                aprilMRR: data.aprilMRR,
                mayMRR: data.mayMRR,
                juneMRR: data.juneMRR,
                julyMRR: data.julyMRR,
                augustMRR: data.augustMRR,
                septemberMRR: data.septemberMRR,
                octoberMRR: data.octoberMRR,
                novemberMRR: data.novemberMRR,
                decemberMRR: data.decemberMRR,
                date: data.date,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }

        const emails = data.recipients_emails;
        const recipients = filterEmails(emails);

        for (let i = 0; i < recipients.length; i++) {  // Corrected for loop syntax
            console.log(recipients[i]);
            await SendInvestorsUpdate(
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
                data.logoUrl,
                data.cash_in_hand,
                data.cash_burn
            );
        }

        return response.status(200).json({
            status: 'success',
            message: 'Investor Update Successfully Sent'
        });
    } catch (err:any) {
        console.log(err.message);
        return response.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};
