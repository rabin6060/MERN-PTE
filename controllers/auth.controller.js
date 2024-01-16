import User from "../models/user.model.js"
import { errorHandler } from "../utils/customError.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const SignUp = async (req,res,next)=>{
    try {
        const hashPassword = bcrypt.hashSync(req.body.password,10)
        const user = await User.create({...req.body,password:hashPassword})
        if(!user) return next(errorHandler(500,'user creation failed.'))
        res.status(201).json({message:'user created successfully.'})
    } catch (error) {
        next(error)
    }
}

export const SignIn = async (req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user) return next(errorHandler(404,"user not found."))
        const matchPassword = bcrypt.compareSync(req.body.password,user.password)
        if(!matchPassword) return next(errorHandler(401,"password not match"))
        const {password:pass,...rest} = user._doc
        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET_KEY)
        res.cookie('token',token)
        .status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const LogOut = async (req,res,next)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({message:'logout successfully.'})
    } catch (error) {
        next(error)
    }
    
}