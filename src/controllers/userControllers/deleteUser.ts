import { JwtPayload } from "jsonwebtoken";
import { Response } from 'express'
import User from "../../models/userModel/userModel";

export const deleteUser = async (request: JwtPayload, response: Response) => {
    try {
        const userId = request.user.id;
        const user = await User.findOne({ where: { id: userId} })
        if (!user) {
            return response.status(400).json({
                status: "error",
                message: `Unable to delete this user`
            })
        }
        if (user) {
            const deletedUser = await User.destroy({ where: { id: userId } })
            if (deletedUser) {
                return response.status(200).json({
                    status: "success",
                    message: `Account successfully deleted`,
                })
            }else{
                return response.status(400).json({
                    status: "error",
                    message: `Unable to delete this user at the moment`
                })
            }
        }

    } catch (error: any) {
        console.log(error.message)
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}