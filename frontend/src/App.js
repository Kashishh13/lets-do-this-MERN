import React, { useEffect } from 'react'
import Home from './Pages/Home'
import {Route, Routes, useNavigate} from 'react-router-dom'
import All from './Pages/All'
import Imp from './Pages/Imp'
import Completed from './Pages/Completed'
import Incompleted from './Pages/Incompleted'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { useSelector } from 'react-redux'
import { authActions } from './store/auth'
import { useDispatch } from 'react-redux'
const App = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("id")&&localStorage.getItem("token")){
      dispatch(authActions.login())
      navigate("/")
    }
    else if(isLoggedIn===false){
      navigate("/signup")
        }
  },[])

  return (
   <div className='bg-gray-600 text-black h-screen p-8 relative'>

<Routes>
  <Route exact path='/' element={<Home/>}>
  < Route index element={<All/>}/>
  < Route path='/important-task' element={<Imp/>}/>
  < Route path='/completed-tasks' element={<Completed/>}/>
  < Route path='/incomplete-tasks' element={<Incompleted/>}/>
  </Route>
<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
</Routes>

      
    </div>
  )
}

export default App