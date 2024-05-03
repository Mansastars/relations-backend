import express from "express";
import { generalAuthoriser } from "../../middleware/authorization";
import { getAllContacts } from "../../controllers/contactControllers/getAllContact";
import { getContactedContacts } from "../../controllers/contactControllers/getContactsInContactedStage";
import { getOfferContacts } from "../../controllers/contactControllers/getContactInOfferStage";
import { getDealContacts } from "../../controllers/contactControllers/getContactsInDealStage";
import { getFollowUpContacts } from "../../controllers/contactControllers/getContactsInFollowUpStage";
import { getNegotiationContacts } from "../../controllers/contactControllers/getContactsInNegotiationStage";
import { getPartnerContacts } from "../../controllers/contactControllers/getContactsInPartnerStage";
import { getPitchContacts } from "../../controllers/contactControllers/getContactsInPitchStage";
import { getProspectContacts } from "../../controllers/contactControllers/getContactsInProspectStage";
import { getRejectionContacts } from "../../controllers/contactControllers/getContactsInRejectionStage";
import { getResearchContacts } from "../../controllers/contactControllers/getContactsInResearchStage";
import { getReviewContacts } from "../../controllers/contactControllers/getContactsInReviewStage";
import { deleteContact } from "../../controllers/contactControllers/deleteContact";
import { getSingleContact } from "../../controllers/contactControllers/getSingleContact";
import { importContacts } from "../../controllers/contactControllers/importContacts";

const router = express.Router();

router.get("/allcontacts", generalAuthoriser, getAllContacts)
router.get("/offer-contacts", generalAuthoriser, getOfferContacts)
router.get("/contacted-contacts", generalAuthoriser, getContactedContacts)
router.get("/deal-contacts", generalAuthoriser, getDealContacts)
router.get("/followup-contacts", generalAuthoriser, getFollowUpContacts)
router.get("/negotiation-contacts", generalAuthoriser, getNegotiationContacts)
router.get("/partner-contacts", generalAuthoriser, getPartnerContacts)
router.get("/pitch-contacts", generalAuthoriser, getPitchContacts)
router.get("/prospect-contacts", generalAuthoriser, getProspectContacts)
router.get("/rejection-contacts", generalAuthoriser, getRejectionContacts)
router.get("/research-contacts", generalAuthoriser, getResearchContacts)
router.get("/review-contacts", generalAuthoriser, getReviewContacts)
router.delete("/delete-contact/:id/:contact", generalAuthoriser, deleteContact)
router.get("/single-contact/:id/:contactId", generalAuthoriser,getSingleContact)
router.post("/import-contacts", generalAuthoriser, importContacts)

export default router;