import { Outlet,useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "../pages/Signin";

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
      <div>
        {/* Render a message or component indicating restricted access */}
        Access to this question is restricted. Please subscribe.
      </div>
    )
  ) : (
    <Outlet />
  );
}
export default ProtectedQuestion;
