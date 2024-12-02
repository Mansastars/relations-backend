import express from "express";
import { generalAuthoriser } from "../../middleware/authorization";
import { addStaff } from "../../controllers/companyControllers/addStaff";
import { deleteStaff } from "../../controllers/companyControllers/deleteStaff";
import { allStaffs } from "../../controllers/companyControllers/allStaffs";
import { switchAccountType } from "../../controllers/companyControllers/switchAccountType";

const router = express.Router();

router.post('/add-staff', generalAuthoriser, addStaff)
router.post('/delete-staff', generalAuthoriser, deleteStaff)
router.get('/all-staffs', generalAuthoriser, allStaffs)
router.post('/switch-account-type', generalAuthoriser, switchAccountType)

export default router;