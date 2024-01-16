import userModel from "../models/user.model.js"
import { errorHandler } from "../utils/customError.js"
import fs from 'fs'
import axios from 'axios'
import openai from "../openai.js"

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

