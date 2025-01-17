import express from "express";
import { generalAuthoriser } from "../middleware/authorization";
import { registerUser } from "../controllers/userControllers/userRegister";
import { userLogin } from "../controllers/userControllers/userLogin";
import { getUserProfile } from "../controllers/userControllers/getUserProfile";
import { changePassword } from "../controllers/userControllers/changePassword";
import { updateProfile } from "../controllers/userControllers/updateProfile";
import { customerPortal, payment, successPayment,  } from "../controllers/userControllers/payment";
import { deleteUser } from "../controllers/userControllers/deleteUser";
import { updateEmail } from "../controllers/userControllers/updateEmail";
import { getSingleUser } from "../controllers/userControllers/getSingleUser";
import { verifyUser } from "../controllers/userControllers/verifyUser";
import { resendVerification } from "../controllers/userControllers/resendVerificationEmail";
import { forgetPassword } from "../controllers/userControllers/forgetPassword";
import { resetPassword } from "../controllers/userControllers/resetPassword";
import { sendUpdate } from "../controllers/investorUpdateController/SendUpdate";
import { getUpdate } from "../controllers/investorUpdateController/getUpdate";
import { googleSignUp } from "../controllers/userControllers/googleSignUp";
import { googleLogin } from "../controllers/userControllers/googleLogin";
import { updateProfilePhoto } from "../controllers/userControllers/updateProfilePicture";
import { deleteProfilePhoto } from "../controllers/userControllers/deleteProfilePicture";


const userRoutes = express.Router();

userRoutes.patch("/change-password", generalAuthoriser, changePassword)
userRoutes.get("/profile", generalAuthoriser, getUserProfile)
userRoutes.patch("/update-profile", generalAuthoriser, updateProfile)
userRoutes.post("/login", userLogin)
userRoutes.post("/register", registerUser)
userRoutes.post("/payment", generalAuthoriser, payment)
userRoutes.get("/successful-payment", generalAuthoriser, successPayment)
userRoutes.delete("/delete-account", generalAuthoriser, deleteUser)
userRoutes.patch("/update-email", generalAuthoriser, updateEmail)
userRoutes.get("/single-user", generalAuthoriser, getSingleUser)
userRoutes.get("/verify/:token", verifyUser)
userRoutes.post("/resend-verification", resendVerification)
userRoutes.post("/forgot-password", forgetPassword)
userRoutes.post("/reset-password/:token", resetPassword)
userRoutes.post("/customer-portal", generalAuthoriser, customerPortal)
userRoutes.post("/send-update", generalAuthoriser, sendUpdate)
userRoutes.get("/get-update", generalAuthoriser, getUpdate)
userRoutes.post("/google_signup", googleSignUp)
userRoutes.post("/google_login", googleLogin)
userRoutes.patch('/update_photo', generalAuthoriser, updateProfilePhoto)
userRoutes.patch("/delete_photo", generalAuthoriser, deleteProfilePhoto)

export default userRoutes;