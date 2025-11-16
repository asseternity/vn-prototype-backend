import express from "express";
import usersController from "../controllers/usersController";

const usersRoute = express.Router();

usersRoute.get("/empty", usersController.getEmptyAsyncMiddleware);
usersRoute.get("/test_user", usersController.getTestUserData);
export default usersRoute;
