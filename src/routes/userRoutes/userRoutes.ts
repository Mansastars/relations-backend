import express from "express";
import { generalAuthoriser } from "../../middleware/authorization";
import { registerUser } from "../../controllers/userControllers/userRegister";
import { userLogin } from "../../controllers/userControllers/userLogin";
import { getUserProfile } from "../../controllers/userControllers/getUserProfile";
import { changePassword } from "../../controllers/userControllers/changePassword";
import { updateProfile } from "../../controllers/userControllers/updateProfile";
import { customerPortal, payment, successPayment,  } from "../../controllers/userControllers/payment";
import { deleteUser } from "../../controllers/userControllers/deleteUser";
import { updateEmail } from "../../controllers/userControllers/updateEmail";
import { getSingleUser } from "../../controllers/userControllers/getSingleUser";
import { verifyUser } from "../../controllers/userControllers/verifyUser";
import { resendVerification } from "../../controllers/userControllers/resendVerificationEmail";
import { forgetPassword } from "../../controllers/userControllers/forgetPassword";
import { resetPassword } from "../../controllers/userControllers/resetPassword";
import { sendUpdate } from "../../controllers/investorUpdateController/SendUpdate";
import { getUpdate } from "../../controllers/investorUpdateController/getUpdate";


const router = express.Router();

router.patch("/change-password", generalAuthoriser, changePassword)
router.get("/profile", generalAuthoriser, getUserProfile)
router.patch("/update-profile", generalAuthoriser, updateProfile)
router.post("/login", userLogin)
router.post("/register", registerUser)
router.post("/payment", generalAuthoriser, payment)
router.get("/successful-payment", generalAuthoriser, successPayment)
router.delete("/delete-account", generalAuthoriser, deleteUser)
router.patch("/update-email", generalAuthoriser, updateEmail)
router.get("/single-user", generalAuthoriser, getSingleUser)
router.get("/verify/:token", verifyUser)
router.post("/resend-verification", resendVerification)
router.post("/forgot-password", forgetPassword)
router.post("/reset-password/:token", resetPassword)
router.post("/customer-portal", generalAuthoriser, customerPortal)
router.post("/send-update", generalAuthoriser, sendUpdate)
router.get("/get-update", generalAuthoriser, getUpdate)

export default router;