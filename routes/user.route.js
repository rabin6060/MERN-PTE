import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { Delete, Payment, PaymentFailure, PaymentSuccess, TranscribeAudio, UpdateUser } from '../controllers/user.controller.js'


const router = express.Router()

router.put('/update/:id',verifyToken,UpdateUser)
router.delete('/delete/:id',verifyToken,Delete)
router.post('/audio',verifyToken,TranscribeAudio)
router.post('/create-subs-session',verifyToken,Payment)
router.post('/updateSubsStatus',verifyToken,PaymentSuccess)
router.post('/payment-failed',verifyToken,PaymentFailure)

export default router