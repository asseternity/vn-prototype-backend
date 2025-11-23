import express from "express";
import storyController from "../controllers/storyController";

const storyRoute = express.Router();

storyRoute.get("/event/:event_id", storyController.getSendEvent);

export default storyRoute;
