import express from "express";
import { generalAuthoriser } from "../middleware/authorization";
import { getContactedContacts } from "../controllers/contactControllers/getContactsInContactedStage";
import { getOfferContacts } from "../controllers/contactControllers/getContactInOfferStage";
import { getDealContacts } from "../controllers/contactControllers/getContactsInDealStage";
import { getFollowUpContacts } from "../controllers/contactControllers/getContactsInFollowUpStage";
import { getNegotiationContacts } from "../controllers/contactControllers/getContactsInNegotiationStage";
import { getPartnerContacts } from "../controllers/contactControllers/getContactsInPartnerStage";
import { getPitchContacts } from "../controllers/contactControllers/getContactsInPitchStage";
import { getProspectContacts } from "../controllers/contactControllers/getContactsInProspectStage";
import { getRejectionContacts } from "../controllers/contactControllers/getContactsInRejectionStage";
import { getResearchContacts } from "../controllers/contactControllers/getContactsInResearchStage";
import { getReviewContacts } from "../controllers/contactControllers/getContactsInReviewStage";
import { deleteContact } from "../controllers/contactControllers/deleteContact";
import { getSingleContact } from "../controllers/contactControllers/getSingleContact";
import { importContacts } from "../controllers/contactControllers/importContacts";
import { exportContacts } from "../controllers/contactControllers/exportContacts";
import { getAllContacts } from "../controllers/contactControllers/getAllContacts";
import { deleteContactPhoto } from "../controllers/contactControllers/deleteContactPhoto";
import { singleContact } from "../controllers/contactControllers/singleContact";
import { editSingleContact } from "../controllers/contactControllers/editSingleContact";
import { deleteSingleContact } from "../controllers/contactControllers/deleteSingleContact";

const contactRoutes = express.Router();

contactRoutes.get("/all-contacts", generalAuthoriser, getAllContacts)
contactRoutes.get("/offer-contacts", generalAuthoriser, getOfferContacts)
contactRoutes.get("/contacted-contacts", generalAuthoriser, getContactedContacts)
contactRoutes.get("/deal-contacts", generalAuthoriser, getDealContacts)
contactRoutes.get("/followup-contacts", generalAuthoriser, getFollowUpContacts)
contactRoutes.get("/negotiation-contacts", generalAuthoriser, getNegotiationContacts)
contactRoutes.get("/partner-contacts", generalAuthoriser, getPartnerContacts)
contactRoutes.get("/pitch-contacts", generalAuthoriser, getPitchContacts)
contactRoutes.get("/prospect-contacts", generalAuthoriser, getProspectContacts)
contactRoutes.get("/rejection-contacts", generalAuthoriser, getRejectionContacts)
contactRoutes.get("/research-contacts", generalAuthoriser, getResearchContacts)
contactRoutes.get("/review-contacts", generalAuthoriser, getReviewContacts)
contactRoutes.delete("/delete-contact/:id/:contact", generalAuthoriser, deleteContact)
contactRoutes.get("/single-contact/:id/:contactId",getSingleContact)
contactRoutes.post("/import-contacts", generalAuthoriser, importContacts)
contactRoutes.get("/export-contacts", generalAuthoriser, exportContacts)
contactRoutes.patch("/delete_photo/:id/:contactId", generalAuthoriser, deleteContactPhoto)
contactRoutes.get("/get-single-contact/:contactId", generalAuthoriser, singleContact)
contactRoutes.patch("/edit-single-contact/:contactId", generalAuthoriser, editSingleContact)
contactRoutes.delete("/delete-single-contact/:contactId", generalAuthoriser, deleteSingleContact)

export default contactRoutes;