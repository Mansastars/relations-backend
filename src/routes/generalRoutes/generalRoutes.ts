import express from "express";
import { newWaitList } from "../../controllers/generalControllers/Waitlist";
import { requestFeature } from "../../controllers/generalControllers/requestFeature";
import { generalAuthoriser } from "../../middleware/authorization";
import { template1 } from "../../utilities/notifications/broadCastMail/template1";
import { sendBroadCastEmail } from "../../controllers/broadCastControllers/sendBroadCastEmail";

const router = express.Router();

router.post("/waitlist", newWaitList)
router.post("/request-feature", requestFeature)
router.post("/broadcast-email", generalAuthoriser, sendBroadCastEmail)

export default router;