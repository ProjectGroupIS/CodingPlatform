import express from 'express'
import run  from '../Controllers/runController.js';
import { ensureAuthenticated } from '../Middleware/authenticationMiddleware.js';
const executeRouter = express.Router();

// executeRouter.post("/run",ensureAuthenticated,run)
executeRouter.post('/run',run)

export {executeRouter}

