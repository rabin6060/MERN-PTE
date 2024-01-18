import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import AddQuestion from "./pages/AddQuestion";
import PractiseQuestions from "./pages/PractiseQuestions";
import QuestionDetail from "./pages/QuestionDetail";
import Protected from "./components/Protected";
import ProtectedQuestion from "./components/ProtectedQuestion";
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { questionFetchError, questionFetchStart, questionFetchSuccess } from './redux/question/questionSlice'
import Success from "./pages/Success";
import Payment from "./pages/Payment";
import Cancel from "./pages/Cancel";



const App = () => {
 
  const dispatch = useDispatch()
  useEffect(()=>{
        dispatch(questionFetchStart())
        const fetch = async ()=>{
            try {
                const res = await axios.get('http://localhost:8000/api/question')
                if (!res) {
                    dispatch(questionFetchError(res.data))
                }
                dispatch(questionFetchSuccess(res.data))
            } catch (error) {
                dispatch(questionFetchError(error.message))
            }
        }
          fetch()
    },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/add" element={<AddQuestion />} />
          <Route element={<Protected />}>
             <Route path="/success" element={<Success/>}/>
             <Route path="/cancel" element={<Cancel/>}/>
            
             <Route path="/payment" element={<Payment/>} />

            <Route path="/practise" element={<PractiseQuestions />} />
            <Route element={<ProtectedQuestion/>}>
              <Route path="/question/:id" element={<QuestionDetail />} />
            </Route> 
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
