import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { GetQuestions, QuestionCreate, SingleQuestion } from '../controllers/question.controller.js'

const router = express.Router()

router.post('/addQuestion',verifyToken,QuestionCreate)
router.get('/',verifyToken,GetQuestions)
router.get('/single/:id',verifyToken,SingleQuestion)

export default router