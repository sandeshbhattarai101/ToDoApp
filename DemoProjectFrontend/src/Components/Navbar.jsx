import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

export default function Navbar({user}) {

  const navigate = useNavigate();

  const handleLogout = async()=>{
    // WE ARE USING proxy in package.json so no need to use http://localhost:3000/api/
  //  const res =  await axios.get('http://localhost:3000/api/auth/logout',{
  //     withCredentials: true
  //   })
   const res =  await axios.get('http://localhost:3000/api/auth/logout',{
      withCredentials: true
    })

    if(res.status == 200){
      alert(res.data.message);
    }

  }

  return (
    <>
    <div className='Container sticky flex shadow-md h-[40px] items-center bg-slate-300'>

      <div className='leftNav font-medium flex  gap-10 ml-5'>
        <Link>
        <button className='hover:text-gray-600'>Home</button>
        </Link>
        <Link>
        <button className='hover:text-gray-600'>About</button>
        </Link>
        <Link>
        <button className='hover:text-gray-600'>Contact Us</button>
        </Link>
      </div>

      <div className='rightNav font-medium absolute right-10 '>
       {!user ?
        <Link to={'/login'}>
         <button className='login border-blue-600 rounded-lg w-[80px] p-[3px] border-2 hover:bg-slate-400'> Login</button> 
        </Link>
         :
         <Link to={"/login"}>
         <button onClick={handleLogout} className='login border-blue-600 rounded-lg w-[80px] p-[3px] border-2 hover:bg-slate-400'> Logout</button> 
         </Link>
       } 

      </div>

    </div>
    </>
)
}
