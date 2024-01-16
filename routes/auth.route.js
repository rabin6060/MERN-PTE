import express from 'express'
import { LogOut, SignIn, SignUp } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup',SignUp)
router.post('/signin',SignIn)
router.get('/logout',LogOut)



export default router