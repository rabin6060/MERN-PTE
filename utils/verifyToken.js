import { errorHandler } from "./customError.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.token
    if(!token) return next(errorHandler(403,'user not authorized!!'))
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,userData)=>{
        if(err) return next(errorHandler(403,'forbidden.'))
        req.user = userData
        next()
    })

}