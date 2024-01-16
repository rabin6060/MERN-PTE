import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    audioUrl:{
        type:String,
        required:true
    },
    transcribedAudio:{
        type:String,
        required:true
    },
    availability:{
        type:String,
        required:true,
        enum:['free','pro']
    }
},{timestamps:true})

const questionModel = mongoose.model('question',questionSchema)
export default questionModel