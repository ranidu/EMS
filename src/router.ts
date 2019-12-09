import express from "express";
import { AppController } from "./AppController";
const router = express.Router();

export default config => {
  AppController.init(config);

  router.post("/emails", AppController.sendEmail);

  router.get("/emails/:id", AppController.getEmail);

  router.delete("/emails/:id", AppController.deleteQueuedEmail);

  router.post("/emails/webhook", AppController.updateScheduleEmailStatus);

  return router;
};
