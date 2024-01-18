import { Outlet,useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const ProtectedQuestion = () => {
  const { currentUser } = useSelector((state) => state.user);
  const {questions} = useSelector(state=>state.question)
  const isUserSubscribed = currentUser?.subscribed === 'yes';
  const {id} = useParams()
  
  const selectedQuestion = questions.find(question=>question._id===id)
  
  return !isUserSubscribed ?  (
    selectedQuestion && selectedQuestion.availability === 'free' ? (
      <Outlet />
    ) : (
      <div className="h-[65vh]">
        <div className="max-w-[60%] w-full h-full m-auto py-32">
          <div className="w-full space-y-5">
            <h1 className="text-xl sm:text-5xl capitalize">Please subscribe to access pro questions.</h1>
            <p className="text-lg sm:text-3xl text-slate-500 font-[300]">You are required to buy our subscription to fully use our services.</p>
            <Link to={'/payment'}>
              <button className="btn px-10 mt-5">Go Pro</button>
            </Link>
          
          </div>
        </div>
      </div>
    )
  ) : (
    <Outlet />
  );
}
export default ProtectedQuestion;
