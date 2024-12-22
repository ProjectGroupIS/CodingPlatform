import express from "express";
import { getUser } from "../Controllers/userController.js";
import { ensureAuthenticated } from "../Middleware/authenticationMiddleware.js";

const router = express.Router();
router.get('/users/:userID',ensureAuthenticated,getUser)