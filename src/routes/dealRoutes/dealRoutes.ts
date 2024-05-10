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
import { editDeal } from "../../controllers/dealControllers/editDeal";
import { editDealContact } from "../../controllers/dealControllers/editDealContact";

const router = express.Router();

router.patch("/change-stage/:id", generalAuthoriser, changeDealContactStage)
router.post("/create-deal", generalAuthoriser , createDeal)
router.patch("/edit-deal/:id", generalAuthoriser, editDeal)
router.post("/create-contact/:id", generalAuthoriser , createDealContact)
router.patch("/edit-contact/:id/:contactId", generalAuthoriser, editDealContact)
router.get("/deals", generalAuthoriser, getAllDeals)
router.get("/contacted-contacts/:id", getContactedContacts)
router.get("/deal-contacts/:id", getDealContacts)
router.get("/followup-contacts/:id", getFollowUpContacts)
router.get("/negotiation-contacts/:id", getNegotiationContacts)
router.get("/offer-contacts/:id", getOfferContacts)
router.get("/partner-contacts/:id", getPartnerContacts)
router.get("/pitch-contacts/:id", getPitchContacts)
router.get("/prospect-contacts/:id", getProspectContacts)
router.get("/rejection-contacts/:id", getRejectionContacts)
router.get("/research-contacts/:id", getResearchContacts)
router.get("/review-contacts/:id", getReviewContacts)
router.get("/single-deal/:id", getSingleDeal)
router.delete("/delete-deal/:id", generalAuthoriser, deleteDeal)

export default router;