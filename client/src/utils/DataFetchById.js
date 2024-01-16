import { useEffect, useState } from 'react'
import axios from 'axios'
export const DataFetchById = (id) =>{
    const [question,setQuestion] = useState(null)
    const [error,setError] = useState(false)
    
    useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/question/single/${id}`);
        setQuestion(res.data);
      } catch (error) {
        setError(error.message)
      }
    };
    fetch();
  }, [id]);

  return question ,error
}