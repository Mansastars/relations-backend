import { Response } from "express";
import { v4 } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import Deal, { DealAttributes } from "../../models/dealModel/dealModel";

export const createDeal = async (request: JwtPayload, response: Response) => {
  try {
    const {
        deal_name,
        deal_size,
        dead_line,
        negotiation_value,
        signed_value
    } = request.body;
    const userId = request.user.id;


    const dealId = v4();


    const newUser = await Deal.create({
        id:dealId,
        owner_id:userId,
        deal_name,
        deal_size,
        dead_line,
        negotiation_value,
        signed_value,
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
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      method: request.method,
      message: error.message,
    });
  }
};
