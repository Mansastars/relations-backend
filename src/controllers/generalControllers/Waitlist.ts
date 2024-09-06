import { Request, Response } from "express";
import WaitList from "../../models/WaitlistModel/Waitlist";
import { v4 } from "uuid";

export const newWaitList = async (request: Request, response: Response) => {
  const {
    first_name,
    last_name,
    phone_number,
    email,
    email_provider,
    company,
    role,
    team_size,
    feature,
  } = request.body;
  try {
    const newWaitlist = await WaitList.create({
      id: v4(),
      first_name,
      last_name,
      telephone: phone_number,
      email,
      email_provider,
      company,
      role,
      team_size,
      feature,
      created_at: new Date(),
    });
    return response.status(200).json({
        status:`success`,
        message:`Successfully Added to waitlist`,
    })
  } catch (error: any) {
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};
