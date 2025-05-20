
import Home from './pages/Home';
import Alltasks from './pages/Alltasks';
import { Routes, Route, useNavigate } from "react-router-dom";
import Importanttasks from './pages/Importanttasks';
import Incompletedtasks from './pages/Incompletedtasks';
import Completedtasks from './pages/Completedtasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector , useDispatch } from 'react-redux';
import React, { useEffect } from 'react'; 
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
        dispatch(authActions.login());}
    else if (!isLoggedIn === false) {
      navigate("/signup");
    }
  }, [] );
  

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      
        <Routes>
          <Route exact path='/' element={<Home />} > 
          <Route index element={<Alltasks />} />
          <Route path='/importanttasks' element={<Importanttasks />} />
          <Route path='/completedtasks' element={<Completedtasks />} />
          <Route path='/incompletedtasks' element={<Incompletedtasks />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    
      
    </div>
  )
}

export default App