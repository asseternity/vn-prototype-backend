import express from "express";
import storyController from "../controllers/storyController";

const storyRoute = express.Router();

storyRoute.get("/empty", storyController.emptyAsyncMiddleware);

export default storyRoute;
