import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { generateToken } from "../../helpers/helpers";
import moment from "moment";
import Payment from "../../models/paymentModel/paymentModel";
import { v4 } from "uuid";
const stripe = require("stripe")(process.env.SECRET_KEY)


export const userLogin = async (request: Request, response: Response) => {
  try {
    let { email, password } = request.body;

    const user1 = (await User.findOne({ where: { email: email } })) as unknown as UserAttributes;

    if (!user1) {
      return response.status(404).json({
        status: `error`,
        message: `User with the email ${email} is not registered`,
      });
    }

    const validate = await bcrypt.compare(password, user1.password);

    if (!validate) {
      return response.status(400).json({
        status: `error`,
        message: `Incorrect Password`,
      });
    }

    const data = {
      id: user1.id,
      email: user1.email,
    };
    const token = generateToken(data);

    //to check if customer is subscribed
    const customers = await stripe.customers.list({ email: email })
    if (customers.data.length > 0) {
      const Allsubscription = await stripe.subscriptions.list({ customer: customers.data[0].id, status: 'active' })
      const session = await stripe.invoices.retrieve(Allsubscription.data[0].latest_invoice);
      if (session.status === 'paid') {
        const subscriptionId = session.subscription
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const planId = subscription.plan.id;

        let planType = ''
        if (subscription.plan.amount === 2399) planType = "Early-Bird-Monthly"
        if (subscription.plan.amount === 28800) planType = "Early-Bird-Yearly"
        if (subscription.plan.amount === 1499) planType = "Basic-Monthly"
        if (subscription.plan.amount === 17000) planType = "Basic-Yearly"
        if (subscription.plan.amount === 2999) planType = "Standard-Monthly"
        if (subscription.plan.amount === 30000) planType = "Standard-Yearly"
        if (subscription.plan.amount === 9999) planType = "Premium-Monthly"
        if (subscription.plan.amount === 100000) planType = "Premium-Yearly"

        const startDate = new Date(moment.unix(subscription.current_period_start).toDate().toISOString());
        const endDate = new Date(moment.unix(subscription.current_period_end).toDate().toISOString());
        const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
        const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();
        const userPaymentExist = await Payment.findOne({ where: { user_id: user1.id } })
        if (userPaymentExist) {
          const updateUserPayment = await Payment.update({
            session,
            plan_id: planId,
            plan_type: planType,
            status: session.status,
            plan_start_date: startDate,
            plan_end_date: endDate,
            plan_duration: String(durationInDays),
            updatedAt: new Date(),
          }, { where: { user_id: user1.id } })
        } else {
          const createUserPayment = await Payment.create({
            id: v4(),
            user_id: user1.id,
            session,
            session_id: session.id,
            plan_id: planId,
            plan_type: planType,
            status: session.payment_status,
            plan_start_date: startDate,
            plan_end_date: endDate,
            plan_duration: String(durationInDays),
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }

        await User.update({
          is_subscribed: true,
          subscription_start_date: startDate,
          subscription_end_date: endDate,
          subscription_name: planType,
          on_trial: false
        }, {
          where: {
            id: user1.id
          }
        })

      }
    } else {
      const user = (await User.findOne({ where: { email: email } })) as unknown as UserAttributes;

      //To calculate number of days from account creation
      const currentDate: any = new Date()
      const userCreatedDate: any = user1.createdAt
      const numberOfDays: any = Number((currentDate - userCreatedDate) / (1000 * 60 * 60 * 24))
      const numberOfDaysLeft = 7 - numberOfDays

      //to show banner
      let showBanner = null
      if (numberOfDays < 7 && user.subscription_name === null) {
        showBanner = true
      } else {
        showBanner = false
      }

      //to show billing page
      let showBilling = null
      if (numberOfDays > 7 && user.subscription_name === null) {
        showBilling = true
      } else {
        showBilling = false
      }

      return response.status(200).json({
        message: `Welcome back ${user.first_name}`,
        token,
        user,
        numberOfDaysLeft,
        showBanner,
        showBilling
      });
    }

    const user = (await User.findOne({ where: { email: email } })) as unknown as UserAttributes;

    //To calculate number of days from account creation
    const currentDate: any = new Date()
    const userCreatedDate: any = user1.createdAt
    const numberOfDays: any = Number((currentDate - userCreatedDate) / (1000 * 60 * 60 * 24))
    const numberOfDaysLeft = 7 - numberOfDays

    //to show banner
    let showBanner = null
    if (numberOfDays < 7 && user.subscription_name === null) {
      showBanner = true
    } else {
      showBanner = false
    }

    //to show billing page
    let showBilling = null
    if (numberOfDays > 7 && user.subscription_name === null) {
      showBilling = true
    } else {
      showBilling = false
    }

    return response.status(200).json({
      message: `Welcome back ${user.first_name}`,
      token,
      user,
      numberOfDaysLeft,
      showBanner,
      showBilling
    });

  } catch (error: any) {
    console.log(error.message);
    response.status(500).json({
      status: `error`,
      method: request.method,
      message: error.message,
    });
  }
};
