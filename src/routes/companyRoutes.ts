import express from "express";
import { generalAuthoriser } from "../middleware/authorization";
import { addStaff } from "../controllers/companyControllers/addStaff";
import { deleteStaff } from "../controllers/companyControllers/deleteStaff";
import { allStaffs } from "../controllers/companyControllers/allStaffs";
import { switchAccountType } from "../controllers/companyControllers/switchAccountType";
import { updateStaff } from "../controllers/companyControllers/updateStaff";

const companyRoutes = express.Router();

companyRoutes.post('/add-staff', generalAuthoriser, addStaff)
companyRoutes.delete('/delete-staff/:id', generalAuthoriser, deleteStaff)
companyRoutes.put('/update-staff', generalAuthoriser, updateStaff)
companyRoutes.get('/all-staffs', generalAuthoriser, allStaffs)
companyRoutes.post('/switch-account-type', generalAuthoriser, switchAccountType)

export default companyRoutes;