import express from "express";
import { index } from "../controllers";
import userRoutes from "./userRoutes";
import contactRoutes from "./contactRoutes";
import dealRoutes from "./dealRoutes";
import generalRoutes from "./generalRoutes";
import companyRoutes from "./companyRoutes";


const indexRoutes = express.Router();
indexRoutes.get("/", index);
indexRoutes.use("/users", userRoutes)
indexRoutes.use("/contacts", contactRoutes);
indexRoutes.use("/deals", dealRoutes)
indexRoutes.use("/general", generalRoutes)
indexRoutes.use('/company', companyRoutes)

export default indexRoutes;
