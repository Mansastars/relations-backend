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
            line_items: [
                {
                    price: plan,
                    quantity: 1
                },
            ],
            success_url: "http://localhost:5173/successful-payment?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:5173/cancel-payment"
        });
        return session;
    } catch (error: any) {
        return error;
    }
};


export const payment = async (request: JwtPayload, response: Response) => {
    const [monthly, annually] = ["price_1OZfz6E2tszo5U9y32IqTLyV", "price_1OZgFpE2tszo5U9y7Qf1zkWb"]

    const { plan, userId, } = request.body;

    let planId = "";

    if (plan == 29.99) planId = monthly;
    else if (plan == 300) planId = annually;

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
            const planType = subscription.plan.amount === 2999 ? "Standard" : "Premium";
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
                status:`error`,
                message: "Payment Successful"
            });
        }

        //     return response.json({ message: "Payment successful" });
        else {
            return response.json({
                status:`error`,
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