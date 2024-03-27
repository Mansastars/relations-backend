import express from "express";
import { generalAuthoriser } from "../../middleware/authorization";
import { registerUser } from "../../controllers/userControllers/userRegister";
import { userLogin } from "../../controllers/userControllers/userLogin";
import { getUserProfile } from "../../controllers/userControllers/getUserProfile";
import { changePassword } from "../../controllers/userControllers/changePassword";
import { updateProfile } from "../../controllers/userControllers/updateProfile";
import { payment, successPayment,  } from "../../controllers/userControllers/payment";
import { deleteUser } from "../../controllers/userControllers/deleteUser";
import { updateEmail } from "../../controllers/userControllers/updateEmail";
import { getSingleUser } from "../../controllers/userControllers/getSingleUser";


const router = express.Router();

router.patch("/change-password", changePassword)
router.get("/profile", generalAuthoriser, getUserProfile)
router.patch("update-profile", generalAuthoriser, updateProfile)
router.post("/login", userLogin)
router.post("/register", registerUser)
router.post("/payment", generalAuthoriser, payment)
router.get("/successful-payment", generalAuthoriser, successPayment)
router.delete("/delete-account", generalAuthoriser, deleteUser)
router.patch("/update-email", generalAuthoriser, updateEmail)
router.get("/single-user", generalAuthoriser, getSingleUser)

export default router;