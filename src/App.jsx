import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import SignUp from './pages/SingUp/SignUp';
import Login from './pages/Login/Login';
import Error404 from './pages/Error404/Error404';

const routes = ( 
  <Router>
    <Routes>
      
    <Route exact path='/dashboard'  element={<Home/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/signup'  element={<SignUp/>}/>
    <Route path='*'  element={<Error404/>}/>
    </Routes>
  </Router>  
)
const App = () => {
  return <div>{routes} </div>
   };

export default App
