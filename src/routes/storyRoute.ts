import express from "express";
import storyController from "../controllers/storyController";

const storyRoute = express.Router();

storyRoute.get("/empty", storyController.getEmptyAsyncMiddleware);
storyRoute.post("/new_game", storyController.postCreateNewStory);
storyRoute.post("/get_line", storyController.postNextLineChainById);
storyRoute.post("/choice_made", storyController.postChoiceMade);

export default storyRoute;
