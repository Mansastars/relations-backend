import { Request, Response } from "express";
import WaitList from "../../models/WaitlistModel/Waitlist";
import { v4 } from "uuid";
import FeatureRequest from "../../models/WaitlistModel/FeatureRequest";

export const requestFeature = async (request: Request, response: Response) => {
  const {
    first_name,
    last_name,
    phone_number,
    email,
    feature_title,
    feature_note,
    feature_date,
    team_size, 
    amount,
  } = request.body;
  try {
    const RequestedFeature = await FeatureRequest.create({
      id: v4(),
      first_name,
      last_name,
      telephone: phone_number,
      email,
      feature_title,
      feature_note,
      feature_date,
      team_size, 
      amount,
      created_at: new Date(),
    });
    return response.status(200).json({
        status:`success`,
        message:`Successfully Submitted`,
    })
  } catch (error: any) {
    console.log(error.message)
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
      error: error.message
    });
  }
};
