import express from "express";
import { generalAuthoriser } from "../middleware/authorization";
import { createDeal } from "../controllers/dealControllers/createDeal";
import { getAllDeals } from "../controllers/dealControllers/getAllDeals";
import { createDealContact } from "../controllers/dealControllers/createDealContact";
import { changeDealContactStage } from "../controllers/dealControllers/changeDealContactStage";
import { getContactedContacts } from "../controllers/dealControllers/getDealContactsInContactedStage";
import { getDealContacts } from "../controllers/dealControllers/getDealContactsInDealStage";
import { getFollowUpContacts } from "../controllers/dealControllers/getDealContactsInFollowUpStage";
import { getNegotiationContacts } from "../controllers/dealControllers/getDealContactsInNegotiationStage";
import { getOfferContacts } from "../controllers/dealControllers/getDealContactsInOfferStage";
import { getPartnerContacts } from "../controllers/dealControllers/getDealContactsInPartnerStage";
import { getPitchContacts } from "../controllers/dealControllers/getDealContactsInPitchStage";
import { getProspectContacts } from "../controllers/dealControllers/getDealContactsInProspectStage";
import { getRejectionContacts } from "../controllers/dealControllers/getDealContactsInRejectionStage";
import { getResearchContacts } from "../controllers/dealControllers/getDealContactsInResearchStage";
import { getReviewContacts } from "../controllers/dealControllers/getDealContactsInReviewStage";
import { getSingleDeal } from "../controllers/dealControllers/getSingleDeal";
import { deleteDeal } from "../controllers/dealControllers/deleteDeal";
import { editDeal } from "../controllers/dealControllers/editDeal";
import { editDealContact } from "../controllers/dealControllers/editDealContact";

const dealRoutes = express.Router();

dealRoutes.patch("/change-stage/:id", generalAuthoriser, changeDealContactStage)
dealRoutes.post("/create-deal", generalAuthoriser , createDeal)
dealRoutes.patch("/edit-deal/:id", generalAuthoriser, editDeal)
dealRoutes.post("/create-contact/:id", generalAuthoriser , createDealContact)
dealRoutes.patch("/edit-contact/:id/:contactId", generalAuthoriser, editDealContact)
dealRoutes.get("/deals", generalAuthoriser, getAllDeals)
dealRoutes.get("/contacted-contacts/:id", getContactedContacts)
dealRoutes.get("/deal-contacts/:id", getDealContacts)
dealRoutes.get("/followup-contacts/:id", getFollowUpContacts)
dealRoutes.get("/negotiation-contacts/:id", getNegotiationContacts)
dealRoutes.get("/offer-contacts/:id", getOfferContacts)
dealRoutes.get("/partner-contacts/:id", getPartnerContacts)
dealRoutes.get("/pitch-contacts/:id", getPitchContacts)
dealRoutes.get("/prospect-contacts/:id", getProspectContacts)
dealRoutes.get("/rejection-contacts/:id", getRejectionContacts)
dealRoutes.get("/research-contacts/:id", getResearchContacts)
dealRoutes.get("/review-contacts/:id", getReviewContacts)
dealRoutes.get("/single-deal/:id", getSingleDeal)
dealRoutes.delete("/delete-deal/:id", generalAuthoriser, deleteDeal)

export default dealRoutes;