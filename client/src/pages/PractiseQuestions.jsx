import {useSelector} from 'react-redux'

import { Link } from 'react-router-dom'

const PractiseQuestions = () => {
  const {questions} = useSelector(state=>state.question)
  return (
    <div className='w-full h-[80vh] '>
        <div className='w-full max-w-[60%] m-auto h-full flex flex-col py-28 gap-5'>
            <h1 className='text-xl sm:text-4xl font-[600] text-center sm:text-left'>Questions.</h1>
            <div className='w-full bg-slate-50 '>
                
                {
                    
                    questions?.map((question,index)=>(
                        <div key={question._id} className='flex items-center gap-2 px-5 py-3'>
                            <span>{index+1} :</span>
                            <Link to={`/question/${question._id}`}>
                                <li key={question._id} className='list-none text-lg mb-0'>{question.title}-
                                <span className='text-xl text-gray-500'>[{question.availability}]</span></li>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default PractiseQuestions