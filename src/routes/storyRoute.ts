import express from "express";
import storyController from "../controllers/storyController";

const storyRoute = express.Router();

storyRoute.post("/line", storyController.postSendLineChainNode);
storyRoute.post("/choice", storyController.postChoice);
storyRoute.post("/split", storyController.postSplit);

export default storyRoute;
