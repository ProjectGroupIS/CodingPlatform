import express from "express";
import { getUser } from "../Controllers/userController.js";
import { ensureAuthenticated } from "../Middleware/authenticationMiddleware.js";

export const userRouter = express.Router();
userRouter.get('/:userID',ensureAuthenticated,getUser)