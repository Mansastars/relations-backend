import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { generateToken } from "../../helpers/helpers";

export const userLogin = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;


    const user = (await User.findOne({
      where: { email: email },
    })) as unknown as UserAttributes;

    if (!user) {
      return response.status(404).json({
        status: `Access denied`,
        message: `User with the email ${email} is not registered`,
      });
    }
    const validate = await bcrypt.compare(password, user.password);

    if (!validate) {
      return response.status(400).json({
        status: `error`,
        message: `Incorrect Password`,
      });
    }

    const data = {
      id: user.id,
      email: user.email,
    };

    const token = generateToken(data);

    //To calculate number of days from account creation
    const currentDate:any = new Date()
    const userCreatedDate: any = user.createdAt
    const numberOfDays: any = Number((currentDate - userCreatedDate) / (1000 * 60 * 60 * 24))
    const numberOfDaysLeft = 7 - numberOfDays

    //to show banner
    let showBanner = null
    if(numberOfDays < 7 && user.subscription_name === null){
      showBanner = true
    }else{
      showBanner = false
    }

    //to show billing page
    let showBilling = null
    if(numberOfDays > 7 && user.subscription_name === null){
        showBilling = true
    }else{
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
