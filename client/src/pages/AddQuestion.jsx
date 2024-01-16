import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const AddQuestion = () => {
  const [file,setFile] = useState(null)
  const [audioUrl,setAudioUrl] = useState('')
  const [transcribedAudio,setTranscribedAudio] = useState('')
  const [formData,setFormData] = useState({
    title:'',
    availability:'pro'
  })
 
  const [audioUploadStatus,setAudioUploadStatus] = useState(false)
  const [transcribeStatus,setTranscribeStatus] = useState(false)
  const [uploadStatus,setUploadStatus] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleUpload = (file)=>{
    const storage = getStorage(app)
    const filename = new Date().getTime() + file.name
    const storageRef = ref(storage,filename)
    const uploadTask = uploadBytesResumable(storageRef,file)
   setAudioUploadStatus(true)
    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setAudioUrl(downloadURL)
      setAudioUploadStatus(false)
    });
  })
  }
  const handleAudio = async ()=>{
    setTranscribeStatus(true)
    try {
      const res = await axios.post('http://localhost:8000/api/user/audio',{audio:audioUrl})
      if(!res.data){
        console.log(res.data);
      }
      setTranscribedAudio(res.data);
      setTranscribeStatus(false)

    } catch (error) {
      console.log(error.message)
      setTranscribeStatus(false)
    }
  }
  const handleSubmit =async (e) => {
    e.preventDefault()
    setUploadStatus(true)
    try {
     const res= await axios.post('http://localhost:8000/api/question/addQuestion',{...formData,audioUrl,transcribedAudio})
     if (res.data) {
      setUploadStatus(false)
     }
    } catch (error) {
      console.log(error)
      setUploadStatus(false)
    }
    navigate('/practise')
  }
  
  return (
    <div className='w-full h-[80vh] '>
        <div className='w-full max-w-[60%] m-auto h-full flex items-center justify-center'>
            <div className='flex flex-col gap-10'>
                <h1 className='text-xl sm:text-5xl font-[500]'>Add Questions for Audio Part.</h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-5 '>
                    <div className='flex flex-col gap-5'>
                        <label className='text-lg sm:text-3xl'>Question Title:</label>
                        <input type="text" placeholder='enter the question title...' className='p-2 border-2 outline-none' id='title' onChange={(e)=>handleChange(e)} />
                        <select className='py-2 outline-none border-2' id='availability' value={formData.availability} onChange={(e)=>handleChange(e)}>
                          <option value="free">free</option>
                          <option value="pro">pro</option>
                        </select>
                        <label className='text-lg sm:text-3xl'>Select a audio file:</label>
                        <input type="file" id="file" accept='audio/mpeg' onChange={(e)=>setFile(e.target.files[0])}  required={true}/>
                        <button onClick={()=>handleUpload(file)} type='button' className='w-[45%] py-2 bg-yellow-500 text-white text-xl font-[700] border-none rounded-md'>
                         {!audioUploadStatus ? 'Upload': 'Uploading...'}
                        </button>
                    </div>
                    <button onClick={()=>handleAudio()} disabled={audioUrl.length>1 ? false :true} type='button' className={`w-full py-2 bg-green-500 text-white text-xl font-[700] border-none rounded-md ${audioUrl.length>1?'cursor-pointer':'cursor-not-allowed'}`}>{!transcribeStatus?'Transcribe Audio':'Transcribing wait..'}</button>
                    <button disabled={transcribedAudio.length>1 ? false :true} className={`w-full py-2 bg-yellow-500 text-white text-xl font-[700] border-none rounded-md ${transcribedAudio.length>1?'cursor-pointer':'cursor-not-allowed'}`}>{!uploadStatus?'Upload Question.':'Uploading...'}</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddQuestion