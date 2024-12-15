import express from 'express'
import { getProblem, sort } from '../Controllers/getProblemController.js';
import { pagenate } from '../Middleware/pagentaion.js';
import { Questions } from '../Models/Question.js';

const problemRouter = express.Router();

//get quesions based on id
problemRouter.get('/:questionId',getProblem)
//get all quesions
problemRouter.get('/',pagenate(Questions),sort)

export {problemRouter}