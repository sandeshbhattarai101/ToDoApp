import { useEffect, useState } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom"
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import axios from 'axios'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Signup/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/dashboard' element={<Dashboard/>} />

      </Routes>
    </Router>
     
    </>
  )
}

export default App
