import { Response } from "express";
import User from "../../models/userModel/userModel";
import dotenv from 'dotenv'
import { JwtPayload } from "jsonwebtoken";
import Payment from "../../models/paymentModel/paymentModel";
import { v4 } from "uuid";
import moment from "moment";

dotenv.config()
const stripe = require("stripe")(process.env.SECRET_KEY)


export const stripeSession = async (plan: string) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            allow_promotion_codes: true,
            line_items: [
                {
                    price: plan,
                    quantity: 1
                },
            ],
            success_url: `https://${process.env.DOMAIN}/successful-payment?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://${process.env.DOMAIN}/cancel-payment`
        });
        return session;
    } catch (error: any) {
        return error;
    }
};


export const payment = async (request: JwtPayload, response: Response) => {
    const [earlyBirdMonthly, earlyBirdYearly] = ['price_1OWg1RE2tszo5U9yuSBujW2x', 'price_1OtuhCE2tszo5U9yU2nURHol']
    const [basicMonthly, basicYearly] = ['price_1NflQWE2tszo5U9ytdElmOu6', 'price_1Nt7EsE2tszo5U9yKKiIhy7V']
    const [standardMonthly, standardYearly] = ["price_1NcTZ7E2tszo5U9y2fVeVLtX", "price_1O4NzFE2tszo5U9ymzWC8aKS"]
    const [premiumMonthly, premiumYearly] = ['price_1OkYR0E2tszo5U9yl09Nu5VP', 'price_1OkYWfE2tszo5U9ynYA17JJU']

    const { plan, userId, } = request.body;

    let planId = "";

    if (plan == 23.99) planId = earlyBirdMonthly
    else if (plan == 288.00) planId = earlyBirdYearly
    else if (plan == 14.99) planId = basicMonthly
    else if (plan == 170.00) planId = basicYearly
    else if (plan == 29.99) planId = standardMonthly;
    else if (plan == 300) planId = standardYearly;
    else if (plan == 99.99) planId = premiumMonthly
    else if (plan == 1000.00) planId = premiumYearly

    try {
        const session = await stripeSession(planId);
        const user = await User.findOne({ where: { id: userId } })

        if (!user) {
            return response.status(404).json({
                status: `error`,
                message: `Access denied, you have to login or create an account`,
            });
        }

        await Payment.create({
            id: v4(),
            user_id: userId,
            session,
            session_id: session.id,
            plan_id: ``,
            plan_type: ``,
            status: ``,
            plan_start_date: new Date(),
            plan_end_date: new Date(),
            plan_duration: ``,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return response.json({ session })

    } catch (error: any) {
        return response.status(500).json({
            status: `error`,
            method: request.method,
            message: error.message,
        });
    }
};


export const successPayment = async (request: JwtPayload, response: Response) => {
    try {
        const sessionID = request.query.session_id as string;
        const session = await stripe.checkout.sessions.retrieve(sessionID);
        if (session.payment_status === 'paid') {
            const subscriptionId = session.subscription
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const planId = subscription.plan.id;

            let planType = ''
            if(subscription.plan.amount === 2399) planType = "Early-Bird-Monthly"
            if(subscription.plan.amount === 28800) planType = "Early-Bird-Yearly"
            if(subscription.plan.amount === 1499) planType = "Basic-Monthly"
            if(subscription.plan.amount === 17000) planType = "Basic-Yearly"
            if(subscription.plan.amount === 2999) planType = "Standard-Monthly"
            if(subscription.plan.amount === 30000) planType = "Standard-Yearly"
            if(subscription.plan.amount === 9999) planType = "Premium-Monthly"
            if(subscription.plan.amount === 100000) planType = "Premium-Yearly"

            const startDate = new Date(moment.unix(subscription.current_period_start).toDate().toISOString());
            const endDate = new Date(moment.unix(subscription.current_period_end).toDate().toISOString());
            const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
            const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();
            const paid = await Payment.update({
                session,
                plan_id: planId,
                plan_type: planType,
                status: session.payment_status,
                plan_start_date: startDate,
                plan_end_date: endDate,
                plan_duration: String(durationInDays),
                updatedAt: new Date(),
            }, { where: { session_id: sessionID } })

            const user = await Payment.findOne({ where: { session_id: sessionID } })

            await User.update({
                is_subscribed: true,
                subscription_start_date: startDate,
                subscription_end_date: endDate,
                subscription_name: planType
            }, {
                where: {
                    id: user?.dataValues.user_id
                }
            })
            return response.status(200).json({
                status: `success`,
                message: "Payment Successful"
            });
        }

        else {
            return response.json({
                status: `error`,
                message: "Payment failed"
            });
        }

    } catch (error: any) {
        console.log(error.message)
        return response.status(500).json({
            status: `error`,
            message: `Something went wrong`
        })
    }
}



export const customerPortal = async (request: JwtPayload, response: Response) => {
    try {
        const email = request.body.email

        const customer = await stripe.customers.list({ email: email });
        const customerId = customer.data[0].id

        const session = await stripe.billingPortal.sessions.create({
            customer: `${customerId}`,
            return_url: `https://${process.env.DOMAIN}/alldashboards`,
        });
        if(session.url){
            return response.status(200).json({
                status: `success`,
                message: "Navigating to Customer Portal",
                url:session.url
            });
        }else{
            return response.status(400).json({
                status: `error`,
                message: "Unable to access Customer Portal, please login",
            });
        }
        
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            status: `error`,
            message: `Something went wrong, Please try again`
        })
    }
}