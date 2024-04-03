import express from "express";

import {
  getAllMails,
  getMonthlyMails,
  sendMailHandler,
  todayCreatedMails,
} from "../controllers/mailController.js";

const router = express.Router();

router.post("/send-mail", sendMailHandler);
router.post("/all-mails", getAllMails);
router.post("/today-mails", todayCreatedMails);
router.post("/monthly-mails", getMonthlyMails);

export default router;
