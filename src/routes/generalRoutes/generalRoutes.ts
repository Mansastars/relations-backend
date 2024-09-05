import express from "express";
import { newWaitList } from "../../controllers/generalControllers/Waitlist";
import { requestFeature } from "../../controllers/generalControllers/requestFeature";

const router = express.Router();

router.post("/waitlist", newWaitList)
router.post("/request-feature", requestFeature)

export default router;