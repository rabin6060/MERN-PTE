import Question from "../models/question.model.js"
import { errorHandler } from "../utils/customError.js"
export const QuestionCreate = async (req,res,next)=>{
    try {
        const question =  await Question.create(req.body)
        if(!question) return next(errorHandler(500,'something went wrong'))
        res.status(200).json(question)
    } catch (error) {
        next(error)
    }
}
export const GetQuestions =async(req,res,next)=>{
    try {
        const questions = await Question.find()
        if(!questions) return next(errorHandler(404,'no questions.'))
        res.status(200).json(questions)
    } catch (error) {
        next(error)
    }
}

export const SingleQuestion = async (req,res,next)=>{
    try {
        const question = await Question.findById(req.params.id)
        if(!question) return next(errorHandler(404,'question not found..'))
        res.status(200).json(question)
    } catch (error) {
        next(error)
    }
}
