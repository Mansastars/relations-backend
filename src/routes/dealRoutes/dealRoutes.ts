import express from "express";
import { generalAuthoriser } from "../../middleware/authorization";
import { createDeal } from "../../controllers/dealControllers/createDeal";
import { getAllDeals } from "../../controllers/dealControllers/getAllDeals";
import { createDealContact } from "../../controllers/dealControllers/createDealContact";
import { changeDealContactStage } from "../../controllers/dealControllers/changeDealContactStage";
import { getContactedContacts } from "../../controllers/dealControllers/getDealContactsInContactedStage";
import { getDealContacts } from "../../controllers/dealControllers/getDealContactsInDealStage";
import { getFollowUpContacts } from "../../controllers/dealControllers/getDealContactsInFollowUpStage";
import { getNegotiationContacts } from "../../controllers/dealControllers/getDealContactsInNegotiationStage";
import { getOfferContacts } from "../../controllers/dealControllers/getDealContactsInOfferStage";
import { getPartnerContacts } from "../../controllers/dealControllers/getDealContactsInPartnerStage";
import { getPitchContacts } from "../../controllers/dealControllers/getDealContactsInPitchStage";
import { getProspectContacts } from "../../controllers/dealControllers/getDealContactsInProspectStage";
import { getRejectionContacts } from "../../controllers/dealControllers/getDealContactsInRejectionStage";
import { getResearchContacts } from "../../controllers/dealControllers/getDealContactsInResearchStage";
import { getReviewContacts } from "../../controllers/dealControllers/getDealContactsInReviewStage";
import { getSingleDeal } from "../../controllers/dealControllers/getSingleDeal";
import { deleteDeal } from "../../controllers/dealControllers/deleteDeal";

const router = express.Router();

router.patch("/change-stage/:id", generalAuthoriser, changeDealContactStage)
router.post("/create-deal", generalAuthoriser , createDeal)
router.post("/create-contact/:id", generalAuthoriser , createDealContact)
router.get("/deals", generalAuthoriser, getAllDeals)
router.get("/contacted-contacts/:id", generalAuthoriser, getContactedContacts)
router.get("/deal-contacts/:id", generalAuthoriser, getDealContacts)
router.get("/followup-contacts/:id", generalAuthoriser, getFollowUpContacts)
router.get("/negotiation-contacts/:id", generalAuthoriser, getNegotiationContacts)
router.get("/offer-contacts/:id", generalAuthoriser, getOfferContacts)
router.get("/partner-contacts/:id", generalAuthoriser, getPartnerContacts)
router.get("/pitch-contacts/:id", generalAuthoriser, getPitchContacts)
router.get("/prospect-contacts/:id", generalAuthoriser, getProspectContacts)
router.get("/rejection-contacts/:id", generalAuthoriser, getRejectionContacts)
router.get("/research-contacts/:id", generalAuthoriser, getResearchContacts)
router.get("/review-contacts/:id", generalAuthoriser, getReviewContacts)
router.get("/single-deal/:id", generalAuthoriser, getSingleDeal)
router.delete("/delete-deal/:id", generalAuthoriser, deleteDeal)

export default router;