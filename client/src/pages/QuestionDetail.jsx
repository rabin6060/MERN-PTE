import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SubmitConfirm from '../components/SubmitConfirm';
import {useDispatch,useSelector} from 'react-redux'
import { setSubmit } from '../redux/result/result';

const QuestionDetail = () => {
  const path = window.location.pathname;
  const id = path.slice(10);
  const [question, setQuestion] = useState(null);
  const [answers,setAnswer] = useState([])
  const [randomIndexes, setRandomIndex] = useState([]);
  const [total,setTotal] = useState(0)
  const {isSubmitted} = useSelector(state=>state.result)
  const {questions} = useSelector(state=>state.question)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/question/single/${id}`);
        setQuestion(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);
  
  const handleInputChange = (index,value) => {
    setAnswer((prev)=>{
      let newAnswer = [...prev]
      while (newAnswer.length<=index) {
        newAnswer.push('')
      }
      newAnswer[index] = value 
      return newAnswer
    })
  };
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    setTotal(prev=>{
          return answers.filter(ans=>ans.length>1)
           .reduce((acc,i)=>{
            if (question?.transcribedAudio.includes(i)) {
              return acc+1
            }
            return acc
          },prev)
        })
    dispatch(setSubmit(true))
  }


  const generateRandomInputsLocation = useMemo(() => {
    if (!question) return null;

    const { transcribedAudio, _id } = question;
    const ansArray = transcribedAudio.split(' ');

    if (ansArray) {
      if (randomIndexes.length === 0) {
        // Set the random index when it's not already set
        let tempIndexes = []
        while (transcribedAudio.length<50 ? tempIndexes.length<2 : tempIndexes.length<3) {
          const randomIndex = Math.floor(Math.random() * ansArray.length);
         if (!tempIndexes.includes(randomIndex)) {
            tempIndexes.push(randomIndex);
          }
        }
        setRandomIndex(tempIndexes)
      }
      
      const modifiedText = ansArray.map((word, index) => {
        
        if (randomIndexes.includes(index)) {
          return <input key={`${_id}-input-${index}`} autoComplete='off' id={index} className='outline-none border-b-2 w-[200px] mx-2' type="text" onChange={(e) => handleInputChange(index,e.target.value)} />;
        } else {
          return <span key={`${_id}-word-${index}`}>{word} </span>;
        }
      });

      // Replace the placeholder with the actual input tag within JSX:
      return <p>{modifiedText}</p>
    }
  }, [question, randomIndexes]);
  
  return (
      <div className='w-full h-[80vh] ' key={question?._id}>
        <div className='w-full max-w-[60%] m-auto h-full flex items-center flex-col py-28 gap-5'>
          {
            !isSubmitted ?
            question?
            <div className='w-full px-10 h-full flex flex-col gap-4'>
                <h1 className='text-xl sm:text-4xl font-[300] uppercase'>{question?.title}</h1>
                {
                    question?.audioUrl &&
                    <audio controls>
                        <source src={question.audioUrl} type='audio/mpeg' />
                    </audio>
                }
                
                <h2 className='text-xl sm:text-2xl font-[300]'>Fill up the spaces given below on the basis of audio file.</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <div className='text-lg border-2 p-2 rounded-lg'>{question && generateRandomInputsLocation} </div>
                    
                    <button className='bg-green-400 py-2 text-sm sm:text-xl text-white rounded-lg w-[20%] font-[600]'>Submit Answer</button>
                    <Link to={'/practise'} className='bg-yellow-400 py-2 text-sm sm:text-xl text-white rounded-lg text-center w-[20%] font-[600]'>Practise More</Link>
                </form>
                
            </div>
            :
            ''
            :
            <SubmitConfirm total={total} anslength={randomIndexes.length}/>
          }
        </div>
    </div>
  );
};

export default QuestionDetail;
