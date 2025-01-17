import express from "express";
import { newWaitList } from "../controllers/generalControllers/Waitlist";
import { requestFeature } from "../controllers/generalControllers/requestFeature";
import { generalAuthoriser } from "../middleware/authorization";
import { template1 } from "../utilities/notifications/broadCastMail/template1";
import { sendBroadCastEmail } from "../controllers/broadCastControllers/sendBroadCastEmail";

const generalRoutes = express.Router();

generalRoutes.post("/waitlist", newWaitList)
generalRoutes.post("/request-feature", requestFeature)
generalRoutes.post("/broadcast-email", generalAuthoriser, sendBroadCastEmail)

export default generalRoutes;