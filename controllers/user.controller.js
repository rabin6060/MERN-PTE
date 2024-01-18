import userModel from "../models/user.model.js"
import { errorHandler } from "../utils/customError.js"
import fs from 'fs'
import axios from 'axios'
import openai from "../openai.js"
import stripePackage from 'stripe'

const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY)

export const UpdateUser = async (req,res,next) => {
    if(req.user.id!=req.params.id) return next(errorHandler(403,'you can only edit your account or unauthorized'))
    try {
        const updateInfo = await userModel.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email
            }
        },{new:true})
        res.status(200).json(updateInfo)
    } catch (error) {
        next(error)
    }
}
export const Delete = async (req,res,next)=>{
    if(req.user.id!=req.params.id) return next(errorHandler(403,'you can delete your own account'))
    await userModel.findByIdAndDelete(req.params.id)
    res.clearCookie('token')
    res.status(200).json('account delete successfully')
}
//implement openai for audio transcribe.
export const TranscribeAudio = async (req, res, next) => {
    const audioUrl = req.body.audio
    const tempAudio = 'audio.mp3';
    
    try {
        // Download the audio file
        await downloadFile(audioUrl, tempAudio);

        // Transcribe the downloaded audio file
        const transcription = await transcribe(tempAudio);
        await removeFiles(tempAudio)
        // Send the transcription as response
        res.status(200).json(transcription);
    } catch (error) {
        res.status(500).json('Transcription failed');
        next(error)
    }
};

const downloadFile = async (url, destination) => {
    // Implement the downloadFile function as shown in the previous example
    const writer = fs.createWriteStream(destination);

        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
};

const transcribe = async (audioFilePath) => {
    try {
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(audioFilePath),
            model: "whisper-1"
        });

        if (!transcription) {
            throw new Error('Transcription failed');
        }

        return transcription.text;
    } catch (error) {
        throw error;
    }
};
const removeFiles = async (filepath) => {
    try {
        await fs.promises.unlink(filepath)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const Payment = async (req,res,next)=>{
        const {price,customerId} = req.body
        let planId = null
        if (price===99) {
            planId = process.env.STRIPE_PRO_API_KEY
        }
    try {
        const session = await stripe.checkout.sessions.create({
            mode:'subscription',
            payment_method_types:['card'],
            line_items:[
                {
                    price:planId,
                    quantity:1,
                    
                }
            ],
            success_url:'http://localhost:5173/success',
            cancel_url:'http://localhost:5173/cancel',
            metadata:{
                userId : customerId
            }
        })
        if (!session) {
           res.status(500).json('internal server error.') 
        }
        const updateUserSession = await userModel.findByIdAndUpdate(customerId,{
                $set:{
                    sessionId:session.id,
                }
        },{new:true})
        if(!updateUserSession) return next(errorHandler('no update'))
        res.status(200).json({session,updateUserSession})

    } catch (error) {
        next(error)
    }
}

export const PaymentSuccess = async(req,res,next)=>{
    const {sessionId} = req.body
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        if (session.payment_status==='paid') {
           const updateUser = await userModel.findByIdAndUpdate(req.user.id,{
                $set:{
                    subscribed:'yes'
                }
            },{new:true})
            if(!updateUser) return next(errorHandler(500,'internal server error'))
            res.status(200).json(updateUser)
        }
        
    } catch (error) {
        next(error)
    }
   
}
