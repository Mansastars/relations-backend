import { Response } from "express";
import { v4 } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import Deal, { DealAttributes } from "../../models/dealModel/dealModel";

export const createDeal = async (request: JwtPayload, response: Response) => {
  try {
    const {
      deal_name,
      dead_line,
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

    await Deal.create({
      id: dealId,
      owner_id: userId,
      deal_name,
      deal_size: 0,
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
    return response.status(500).json({
      status: `error`,
      method: request.method,
      message: error.message,
    });
  }
};
