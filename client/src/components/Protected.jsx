import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "../pages/Signin";

const Protected = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (currentUser)?<Outlet/>:<Signin/>
};

export default Protected;
