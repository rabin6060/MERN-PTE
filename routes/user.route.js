import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { Delete, TranscribeAudio, UpdateUser } from '../controllers/user.controller.js'


const router = express.Router()

router.put('/update/:id',verifyToken,UpdateUser)
router.delete('/delete/:id',verifyToken,Delete)
router.post('/audio',verifyToken,TranscribeAudio)

export default router