import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User, { UserAttributes, role } from "../../models/userModel/userModel";
import { v4 } from "uuid";
import { hashPassword } from "../../helpers/helpers";

export const googleSignUp = async (request: JwtPayload, response: Response) => {
    const data = request.body
    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const ticket = await client.verifyIdToken({
            idToken: data.access_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload: any = ticket.getPayload()
        console.log(payload)

        const checkUserEmail = await User.findOne({ where: { email: payload.email } });
        if (checkUserEmail) {
            return response.status(400).json({
                status: `error`,
                message: `${payload.email} is already in use`,
            });
        }
        const userId = v4()
        const passwordHash = await hashPassword(payload.email);

        const newUser = await User.create({
            id: userId,
            first_name:payload.first_name,
            last_name:payload.last_name,
            email:payload.email,
            password: passwordHash,
            role: role.USER,
            on_trial: true,
            is_subscribed: true,
            isVerified: true,
            isBlocked: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }) as unknown as UserAttributes;

        return response.status(200).json({
            status: `success`,
            message: `Google Sign Up Successful`,
        })
    } catch (error: any) {
        console.log(error.message)
        return response.status(500).json({
            status: `error`,
            message: `Google Sign Up failed`,
            error: error.message
        })
    }
}