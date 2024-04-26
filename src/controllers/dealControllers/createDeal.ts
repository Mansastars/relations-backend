import { Response } from "express";
import { v4 } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import Deal, { DealAttributes } from "../../models/dealModel/dealModel";
import User from "../../models/userModel/userModel";

export const createDeal = async (request: JwtPayload, response: Response) => {
  try {
    const {
      deal_name,
      dead_line,
      deal_size
    } = request.body;
    const userId = request.user.id;


    const dealId = v4();

    const dealExist = (await Deal.findOne({ where: { deal_name, owner_id: userId }, }))
    if (dealExist) {
      return response.status(200).json({
        status: `error`,
        message: `${deal_name} already exist, use a different name`,
      });
    }

    let date = new Date()
    let today = date.getDate()
    date.setMonth(date.getMonth() + 1)
    if (today > date.getDate()) {
      date.setDate(0);
    }
    const deadLine = date.toISOString()
    const user = await User.findOne({where:{id:userId}})
    console.log(user?.dataValues.subscription_name)
    if(user?.dataValues.subscription_name == ("Basic-Monthly" ||"Basic-Yearly")){
      return response.status(200).json({
        status: `error`,
        message: `You have to upgrade your subscription to create a neww dashboard`,
      });
    }
    await Deal.create({
      id: dealId,
      owner_id: userId,
      deal_name,
      deal_size: deal_size ||0,
      dead_line: dead_line || deadLine,
      negotiation_value: 0,
      signed_value: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const findDeal = (await Deal.findOne({
      where: { deal_name },
    })) as unknown as DealAttributes;
    if (!findDeal) {
      return response.status(400).json({
        status: `error`,
        message: `Deal not created, try again`,
      });
    }
    return response.status(200).json({
      status: `success`,
      message: `Deal successfully created`,
      findDeal,
    });
  } catch (error: any) {
    if(error.message === 'jwt expired'){
      return response.status(500).json({
        status: `error`,
        navigate: true,
      });
    }
    return response.status(500).json({
      status: `error`,
      method: request.method,
      message: error.message,
    });
  }
};
